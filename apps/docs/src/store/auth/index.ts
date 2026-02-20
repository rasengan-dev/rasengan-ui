import User from "@/entities/user/inde";
import { createStore } from "@rasenganjs/kurama";

type State = {
	user: User | null;
};

type Actions = {
	setUser: (user: User | null) => void;
};

export const useAuthStore = createStore<State & Actions>((set) => ({
	user: null,
	setUser: (user) => set({ user }),
}));
