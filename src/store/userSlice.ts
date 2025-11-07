import { type StateCreator } from "zustand";
import type { User } from "firebase/auth";
import {
  loginWithEmailAndPassword,
  logout,
  registerWithEmailAndPassword,
  watchAuth,
} from "../firebase/auth";

export interface UserSlice {
  loading: boolean;
  error: string | null;
  user: User | null;
  initAuthListener: () => void;
  register: (email: string, password: string) => void;
  login: (email: string, password: string) => void;
  logout: () => void;
}

export const createUserSlice: StateCreator<UserSlice> = (set) => ({
  user: null,
  loading: true,
  error: null,
  initAuthListener: () => {
    watchAuth((currentUser) => {
      set({ user: currentUser, loading: false });
    });
  },
  register: async (email, password) => {
    set({ loading: true, error: null });
    const user = await registerWithEmailAndPassword(email, password);
    set({ user, loading: false });
  },
  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const user = await loginWithEmailAndPassword(email, password);
      set({ user, loading: false });
    } catch (err: unknown) {
      set({ error: (err as Error).message, loading: false });
      throw err;
    }
  },
  logout: async () => {
    set({ loading: true, error: null });
    await logout();
    set({ user: null, loading: false });
  },
});
