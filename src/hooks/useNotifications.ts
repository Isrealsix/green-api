import { useEffect, useState } from 'react';
import { deleteNotification, extractText, receiveNotification } from '@api';
import { POLL_TIMEOUT_SECONDS, RETRY_DELAY_MS } from '@constants';
import type { ConnectionStatus, IncomingText, NotificationBody } from '@models';
import { useAuthStore, useChatStore } from '@store';

const messageTypes = [
  'incomingMessageReceived',
  'outgoingMessageReceived',
  'outgoingAPIMessageReceived',
];

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function toIncomingText(body: NotificationBody): IncomingText | null {
  if (!messageTypes.includes(body.typeWebhook)) return null;
  if (!body.senderData || !body.idMessage) return null;

  const text = extractText(body.messageData);
  if (text === null) return null;

  const sender = body.senderData;
  return {
    chatId: sender.chatId,
    phone: sender.senderPhoneNumber,
    senderName: sender.senderContactName || sender.senderName || sender.chatName,
    idMessage: body.idMessage,
    text,
    out: body.typeWebhook !== 'incomingMessageReceived',
    time: (body.timestamp ?? Date.now() / 1000) * 1000,
  };
}

export function useNotifications() {
  const credentials = useAuthStore((state) => state.credentials);
  const [status, setStatus] = useState<ConnectionStatus>('connecting');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!credentials) return;

    const creds = credentials;
    const controller = new AbortController();
    let stopped = false;
    setStatus('connecting');

    async function poll() {
      while (!stopped) {
        try {
          const notification = await receiveNotification(creds, POLL_TIMEOUT_SECONDS, controller.signal);
          setStatus('online');
          setError('');

          if (!notification) continue;

          try {
            const message = toIncomingText(notification.body);
            if (message) useChatStore.getState().receive(message);
          } finally {
            await deleteNotification(creds, notification.receiptId, controller.signal);
          }
        } catch (err) {
          if (stopped) return;
          setStatus('error');
          setError(err instanceof Error ? err.message : String(err));
          await wait(RETRY_DELAY_MS);
        }
      }
    }

    poll();

    return () => {
      stopped = true;
      controller.abort();
    };
  }, [credentials]);

  return { status, error };
}
