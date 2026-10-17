import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { STORAGE_KEYS, TEXTS } from '@constants';
import type { ChatState } from '@models';
import { addIncoming, buildChat, moveToTop } from '@utils';

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      chats: [],
      activeId: null,

      openChat: (id) =>
        set((state) => ({
          activeId: id,
          chats: state.chats.map((c) => (c.id === id ? { ...c, unread: 0 } : c)),
        })),

      closeChat: () => set({ activeId: null }),

      createChat: (phone) => {
        if (!get().chats.some((c) => c.id === phone)) {
          set((state) => ({ chats: [buildChat(phone), ...state.chats] }));
        }
        get().openChat(phone);
      },

      addPending: (chatId, message) =>
        set((state) => ({
          chats: moveToTop(state.chats, chatId, (chat) => ({
            ...chat,
            messages: [...chat.messages, message],
          })),
        })),

      resolvePending: (chatId, tempId, { status, idMessage, error }) =>
        set((state) => ({
          chats: state.chats.map((chat) => {
            if (chat.id !== chatId) return chat;

            const messages = chat.messages.map((m) => {
              if (m.id !== tempId) return m;
              return {
                ...m,
                id: idMessage || m.id,
                status,
                error: error && TEXTS.messageStatus.sendError(error),
              };
            });
            return { ...chat, messages };
          }),
        })),

      receive: (message) =>
        set((state) => ({ chats: addIncoming(state.chats, message, state.activeId) })),
    }),
    {
      name: STORAGE_KEYS.chats,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ chats: state.chats }),
    }
  )
);

export const selectActiveChat = (state: ChatState) =>
  state.chats.find((c) => c.id === state.activeId) ?? null;
