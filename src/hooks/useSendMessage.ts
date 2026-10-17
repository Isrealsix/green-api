import { useCallback } from 'react';
import { sendMessage } from '@api';
import type { Chat } from '@models';
import { useAuthStore, useChatStore } from '@store';
import { phoneToChatId } from '@utils';

export function useSendMessage() {
  const credentials = useAuthStore((state) => state.credentials);
  const addPending = useChatStore((state) => state.addPending);
  const resolvePending = useChatStore((state) => state.resolvePending);

  return useCallback(
    async (chat: Chat, text: string) => {
      if (!credentials) return;

      const tempId = 'tmp-' + Date.now();
      addPending(chat.id, { id: tempId, text, out: true, time: Date.now(), status: 'pending' });

      try {
        const { idMessage } = await sendMessage(credentials, phoneToChatId(chat.phone), text);
        resolvePending(chat.id, tempId, { status: 'sent', idMessage });
      } catch (err) {
        const error = err instanceof Error ? err.message : String(err);
        resolvePending(chat.id, tempId, { status: 'failed', error });
      }
    },
    [credentials, addPending, resolvePending]
  );
}
