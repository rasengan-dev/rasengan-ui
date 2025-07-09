import { OAuthProvider } from "appwrite";
import { account, ID } from "../config";

const { RASENGAN_APPWRITE_VERIFY_URL, RASENGAN_APPWRITE_FAILED_URL } =
	import.meta.env;

export const authProvider = {
	/**
	 * Login with magic link
	 *
	 * @param email
	 * @returns
	 */
	loginWithMagicLink: async (email: string) => {
		try {
			await account.createMagicURLToken(
				ID.unique(),
				email,
				RASENGAN_APPWRITE_VERIFY_URL
			);

			return { data: true };
		} catch (error) {
			console.error(error);

			return { error: "Failed to send magic link" };
		}
	},

	/**
	 * Create a session with userId and secret
	 *
	 * @param userId
	 * @param secret
	 * @returns
	 */
	createSession: async (userId?: string, secret?: string) => {
		try {
			// If userId and secret are not provided, get the current session
			// Works for oauth login
			if (!userId || !secret) {
				const session = await account.getSession("current");

				return { data: session };
			}

			const session = await account.createSession(userId, secret);

			return { data: session };
		} catch (error) {
			console.error(error);

			return { error: "Failed to create session" };
		}
	},

	/**
	 * Login with oauth provider
	 *
	 * @param provider
	 * @returns
	 */
	loginWithOAuth: async (
		provider: OAuthProvider.Github | OAuthProvider.Google
	) => {
		try {
			account.createOAuth2Session(
				provider,
				RASENGAN_APPWRITE_VERIFY_URL,
				RASENGAN_APPWRITE_FAILED_URL,
				["email", "name"]
			);

			return { data: true };
		} catch (error) {
			console.error(error);

			return { error: "Failed to create session" };
		}
	},
};
