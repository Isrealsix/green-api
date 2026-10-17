import type { Chat, IncomingText, Message } from '@models';
import { phoneToChatId } from '@utils/phone';

export function buildChat(phone: string, name?: string): Chat {
  return {
    id: phone,
    phone,
    name: name || `+${phone}`,
    chatIds: [phoneToChatId(phone)],
    messages: [],
    unread: 0,
  };
}

export function findChat(chats: Chat[], chatId: string, phone?: number | string) {
  return chats.find(
    (chat) => chat.chatIds.includes(chatId) || (phone != null && chat.phone === String(phone))
  );
}

export function moveToTop(chats: Chat[], id: string, update: (chat: Chat) => Chat) {
  const chat = chats.find((c) => c.id === id);
  if (!chat) return chats;
  return [update(chat), ...chats.filter((c) => c.id !== id)];
}

export function addIncoming(chats: Chat[], msg: IncomingText, activeId: string | null) {
  let list = chats;
  let chat = findChat(chats, msg.chatId, msg.phone);

  if (!chat) {
    if (msg.out) return chats;
    chat = buildChat(String(msg.phone ?? msg.chatId), msg.senderName);
    list = [chat, ...chats];
  }

  if (chat.messages.some((m) => m.id === msg.idMessage)) return list;

  const pending = msg.out && chat.messages.find((m) => m.status === 'pending' && m.text === msg.text);
  if (pending) {
    return list.map((c) => {
      if (c !== chat) return c;
      const messages = c.messages.map((m) =>
        m === pending ? { ...m, id: msg.idMessage, status: 'sent' as const } : m
      );
      return { ...c, messages };
    });
  }

  const newMessage: Message = {
    id: msg.idMessage,
    text: msg.text,
    out: msg.out,
    time: msg.time,
    status: 'sent',
  };

  return moveToTop(list, chat.id, (c) => ({
    ...c,
    name: c.name.startsWith('+') && msg.senderName && !msg.out ? msg.senderName : c.name,
    chatIds: c.chatIds.includes(msg.chatId) ? c.chatIds : [...c.chatIds, msg.chatId],
    messages: [...c.messages, newMessage].sort((a, b) => a.time - b.time),
    unread: !msg.out && c.id !== activeId ? c.unread + 1 : c.unread,
  }));
}
