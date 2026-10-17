import type { Chat, Credentials, IncomingText, Message, MessageStatus } from './chat';

export type SendResult = {
  status: MessageStatus;
  idMessage?: string;
  error?: string;
};

export type ChatState = {
  chats: Chat[];
  activeId: string | null;

  openChat: (id: string) => void;
  closeChat: () => void;
  createChat: (phone: string) => void;
  addPending: (chatId: string, message: Message) => void;
  resolvePending: (chatId: string, tempId: string, result: SendResult) => void;
  receive: (message: IncomingText) => void;
};

export type AuthState = {
  credentials: Credentials | null;
  login: (credentials: Credentials) => void;
  logout: () => void;
};
