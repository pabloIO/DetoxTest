// store/auth-store.ts
import * as SecureStore from 'expo-secure-store';
import { create } from 'zustand';

const SESSION_KEY = 'user_session';

type User = {
  id: string;
  email: string;
  token: string;
};

type AuthState = {
  // state
  user: User | null;
  isLoading: boolean; // true while checking stored session on app start
  isAuthenticated: boolean;

  // methods
  loadSession: () => Promise<void>;
  login: (user: User) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (user: Partial<User>) => Promise<void>;
};

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isLoading: true, // start as true — we haven't checked storage yet
  isAuthenticated: false,

  // called once on app start to rehydrate session
  loadSession: async () => {
    try {
      const stored = await SecureStore.getItemAsync(SESSION_KEY);
      if (stored) {
        const user = JSON.parse(stored) as User;
        set({ user, isAuthenticated: true });
      }
    } catch (e) {
      console.error('Failed to load session', e);
    } finally {
      set({ isLoading: false }); // hide splash screen regardless of result
    }
  },

  login: async (user: User) => {
    try {
      await SecureStore.setItemAsync(SESSION_KEY, JSON.stringify(user));
      set({ user, isAuthenticated: true });
    } catch (e) {
      console.error('Failed to save session', e);
    }
  },

  logout: async () => {
    try {
      await SecureStore.deleteItemAsync(SESSION_KEY);
      set({ user: null, isAuthenticated: false });
    } catch (e) {
      console.error('Failed to clear session', e);
    }
  },

  updateUser: async (updates: Partial<User>) => {
    const currentUser = get().user;
    if (!currentUser) return;

    const updatedUser = { ...currentUser, ...updates };
    try {
      await SecureStore.setItemAsync(SESSION_KEY, JSON.stringify(updatedUser));
      set({ user: updatedUser });
    } catch (e) {
      console.error('Failed to update session', e);
    }
  },
}));
