import User from "@/entities/user/inde";
import { databases, collections, ID } from "../config";

const { RASENGAN_APPWRITE_DATABASE_ID } = import.meta.env;

export const userProvider = {
	createUser: async (
		userId: string,
		name: string,
		email: string,
		avatar: string
	) => {
		try {
			const user = await databases.createDocument(
				RASENGAN_APPWRITE_DATABASE_ID,
				collections.USERS,
				userId,
				{
					name,
					email,
					avatar,
				}
			);

			return { data: user };
		} catch (err) {
			console.error(err);

			return { error: "Failed to create user" };
		}
	},

	getUser: async (userId: string) => {
		try {
			const userData = await databases.getDocument(
				RASENGAN_APPWRITE_DATABASE_ID,
				collections.USERS,
				userId
			);

			const user = new User({
				id: userData.$id,
				name: userData.name,
				email: userData.email,
				avatar: userData.avatar,
			});

			return { data: user };
		} catch (err) {
			return { error: "Failed to get user" };
		}
	},
};
