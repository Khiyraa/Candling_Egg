import { create } from 'zustand';
import { UserSession } from '@/types/auth';
import { authService } from '@/services/auth';

interface AuthState {
  user: UserSession | null;
  isLoading: boolean;
  getUser: () => Promise<UserSession | null>;
  fetchUser: () => Promise<void>;
  clearUser: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isLoading: false,

  // Get user function with caching
  getUser: async () => {
    const currentUser = get().user;

    if (currentUser) return currentUser;

    if (get().isLoading) {
      const startTime = Date.now();
      const timeoutMs = 5000; // 5 detik timeout

      while (get().isLoading && Date.now() - startTime < timeoutMs) {
        await new Promise((resolve) => setTimeout(resolve, 100));
      }

      return get().user;
    }

    await get().fetchUser();
    return get().user;
  },

  fetchUser: async () => {
    set({ isLoading: true });

    try {
      const user = await authService.getUser();

      console.log(user);

      set({ user, isLoading: false });
    } catch {
      set({ user: null, isLoading: false });
    }
  },

  clearUser: () => {
    set({ user: null });
  },
}));
