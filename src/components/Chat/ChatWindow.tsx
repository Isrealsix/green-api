import { ChatHeader } from '@components/Chat/ChatHeader';
import { Composer } from '@components/Chat/Composer';
import { MessageList } from '@components/Chat/MessageList';
import { TEXTS } from '@constants';
import { useSendMessage } from '@hooks';
import { selectActiveChat, useChatStore } from '@store';

export function ChatWindow() {
  const chat = useChatStore(selectActiveChat);
  const closeChat = useChatStore((state) => state.closeChat);
  const send = useSendMessage();

  if (!chat) {
    return (
      <section className="chat chat--empty">
        <p className="chat-placeholder">{TEXTS.chat.noChatSelected}</p>
      </section>
    );
  }

  return (
    <section className="chat">
      <ChatHeader chat={chat} onBack={closeChat} />
      <MessageList chat={chat} />
      <Composer key={chat.id} onSend={(text) => send(chat, text)} />
    </section>
  );
}
