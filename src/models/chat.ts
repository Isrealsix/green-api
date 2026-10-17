export type Credentials = {
  idInstance: string;
  apiTokenInstance: string;
  apiUrl: string;
};

export type MessageStatus = 'pending' | 'sent' | 'failed';

export type Message = {
  id: string;
  text: string;
  out: boolean;
  time: number;
  status: MessageStatus;
  error?: string;
};

export type Chat = {
  id: string;
  phone: string;
  name: string;
  chatIds: string[];
  messages: Message[];
  unread: number;
};

export type IncomingText = {
  chatId: string;
  phone?: number | string;
  senderName?: string;
  idMessage: string;
  text: string;
  out: boolean;
  time: number;
};

export type ConnectionStatus = 'connecting' | 'online' | 'error';
