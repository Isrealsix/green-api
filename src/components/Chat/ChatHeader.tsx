import { Avatar } from '@components/common';
import { BackIcon } from '@components/icons';
import { TEXTS } from '@constants';
import type { ChatHeaderProps } from '@models';

export function ChatHeader({ chat, onBack }: ChatHeaderProps) {
  const hasName = chat.name !== `+${chat.phone}`;

  return (
    <header className="chat-header">
      <button className="icon-button back-button" title={TEXTS.chat.back} onClick={onBack}>
        <BackIcon />
      </button>
      <Avatar name={chat.name} size={36} />
      <div className="chat-header-text">
        <h3>{chat.name}</h3>
        <span>{hasName ? `+${chat.phone}` : TEXTS.chat.unnamedContact}</span>
      </div>
    </header>
  );
}
