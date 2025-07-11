import { authProvider } from "@/provider/data/auth";
import { useAuthStore } from "@/store/auth";
import { useNavigate } from "rasengan";
import { useEffect } from "react";

export const useAuth = () => {
	const { setUser } = useAuthStore();

	const navigate = useNavigate();

	useEffect(() => {
		(async () => {
			await handleGetSession();
		})();
	}, []);

	const handleGetSession = async () => {
		const { data } = await authProvider.createSession();

		if (data) {
			const user = data.user;

			setUser(user);
		} else {
			navigate("/");
		}
	};
};
