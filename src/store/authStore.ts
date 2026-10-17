import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { STORAGE_KEYS } from '@constants';
import type { AuthState } from '@models';

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      credentials: null,
      login: (credentials) => set({ credentials }),
      logout: () => set({ credentials: null }),
    }),
    {
      name: STORAGE_KEYS.credentials,
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({ credentials: state.credentials }),
    }
  )
);
