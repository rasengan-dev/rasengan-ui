import User from "@/entities/user/inde";
import { create } from "zustand";

type State = {
	user: User | null;
};

type Actions = {
	setUser: (user: User | null) => void;
};

export const useAuthStore = create<State & Actions>((set) => ({
	user: null,
	setUser: (user) => set({ user }),
}));
