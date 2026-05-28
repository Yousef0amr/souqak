import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { UserDto } from "../types/auth.types";

interface UserState {
  user: UserDto | null;
  setUser: (user: UserDto) => void;
  updateUser: (user: Partial<UserDto>) => void;
  resetUser: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      updateUser: (partial) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...partial } : null,
        })),
      resetUser: () => set({ user: null }),
    }),
    {
      name: "souqak-user-storage",
    }
  )
);
