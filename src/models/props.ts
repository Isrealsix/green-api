import type { Chat, ConnectionStatus, Message } from './chat';

export type AvatarProps = {
  name: string;
  size?: number;
};

export type ChatLogoProps = {
  size?: number;
};

export type SidebarProps = {
  idInstance: string;
  status: ConnectionStatus;
  error: string;
};

export type ChatListItemProps = {
  chat: Chat;
  active: boolean;
  onSelect: (id: string) => void;
};

export type ConnectionStatusProps = {
  status: ConnectionStatus;
  error: string;
  idInstance: string;
};

export type NewChatFormProps = {
  onCreate: (phone: string) => void;
};

export type ChatHeaderProps = {
  chat: Chat;
  onBack: () => void;
};

export type MessageListProps = {
  chat: Chat;
};

export type MessageBubbleProps = {
  message: Message;
};

export type ComposerProps = {
  onSend: (text: string) => void;
};
