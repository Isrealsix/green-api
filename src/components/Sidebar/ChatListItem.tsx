import { Avatar } from '@components/common';
import { TEXTS } from '@constants';
import type { ChatListItemProps } from '@models';
import { formatTime } from '@utils';

export function ChatListItem({ chat, active, onSelect }: ChatListItemProps) {
  const lastMessage = chat.messages[chat.messages.length - 1];

  let preview: string = TEXTS.sidebar.noMessages;
  if (lastMessage) {
    preview = (lastMessage.out ? TEXTS.sidebar.ownMessagePrefix : '') + lastMessage.text;
  }

  return (
    <li
      className={active ? 'chat-item chat-item--active' : 'chat-item'}
      onClick={() => onSelect(chat.id)}
    >
      <Avatar name={chat.name} />

      <div className="chat-item-body">
        <div className="chat-item-row">
          <span className="chat-item-name">{chat.name}</span>
          {lastMessage && <span className="chat-item-time">{formatTime(lastMessage.time)}</span>}
        </div>

        <div className="chat-item-row">
          <span className="chat-item-preview">{preview}</span>
          {chat.unread > 0 && <span className="badge">{chat.unread}</span>}
        </div>
      </div>
    </li>
  );
}
