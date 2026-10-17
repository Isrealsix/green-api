export type StateInstanceResponse = {
  stateInstance: string;
};

export type SendMessageResponse = {
  idMessage: string;
};

export type MessageData = {
  typeMessage: string;
  textMessageData?: { textMessage: string };
  extendedTextMessageData?: { text: string };
};

export type NotificationBody = {
  typeWebhook: string;
  timestamp?: number;
  idMessage?: string;
  senderData?: {
    chatId: string;
    chatName?: string;
    senderName?: string;
    senderContactName?: string;
    senderPhoneNumber?: number;
  };
  messageData?: MessageData;
};

export type Notification = {
  receiptId: number;
  body: NotificationBody;
};
