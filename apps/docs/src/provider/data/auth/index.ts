import { Models, OAuthProvider } from "appwrite";
import { account, avatars, ID } from "../config";
import { userProvider } from "../users";
import User from "@/entities/user/inde";

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
			const origin = window.location.origin;

			await account.createMagicURLToken(
				ID.unique(),
				email,
				origin + RASENGAN_APPWRITE_VERIFY_URL
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
	createSession: async (userId?: string, secret?: string, name?: string) => {
		try {
			let session: Models.Session;

			// If userId and secret are not provided, get the current session
			// Works for oauth login
			if (!userId || !secret) {
				session = await account.getSession("current");
			} else {
				session = await account.createSession(userId!, secret!);

				if (name) {
					// Update user name
					await account.updateName(name);
				}
			}

			const { data: user } = await userProvider.getUser(session.userId);

			if (!user) {
				const { data: personalInformation } =
					await authProvider.getPersonalInformation();

				if (!personalInformation) {
					return { error: "Failed to get personal information" };
				}

				const avatar = avatars.getInitials(personalInformation.email);

				await userProvider.createUser(
					session.userId,
					personalInformation.name || name!,
					personalInformation.email,
					avatar
				);

				return {
					data: {
						session,
						user: new User({
							id: session.userId,
							name: personalInformation.name || name!,
							email: personalInformation.email,
							avatar,
						}),
					},
				};
			}

			return { data: { session, user } };
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
		const origin = window.location.origin;

		try {
			account.createOAuth2Session(
				provider,
				origin + RASENGAN_APPWRITE_VERIFY_URL,
				origin + RASENGAN_APPWRITE_FAILED_URL,
				["email", "name"]
			);

			return { data: true };
		} catch (error) {
			console.error(error);

			return { error: "Failed to create session" };
		}
	},

	/**
	 * Logout
	 *
	 * @returns
	 */
	logout: async () => {
		try {
			await account.deleteSession("current");

			return { data: true };
		} catch (error) {
			console.error(error);

			return { error: "Failed to logout" };
		}
	},

	/**
	 * Get Personal Information of the oauth user
	 *
	 * @returns
	 */
	getPersonalInformation: async () => {
		try {
			const user = await account.get();

			const avatar = avatars.getInitials(user.name);

			// if (providerToken) {

			// }
			console.log(avatar);

			return { data: user };
		} catch (error) {
			console.error(error);

			return { error: "Failed to get personal information" };
		}
	},
};
