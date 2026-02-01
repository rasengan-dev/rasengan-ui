import { Client, Account, Avatars, ID, Databases } from "appwrite";

const { RASENGAN_APPWRITE_ENDPOINT, RASENGAN_APPWRITE_PROJECT_ID } = import.meta
	.env;

export const client = new Client();

// Appwrite Client
client
	.setEndpoint(RASENGAN_APPWRITE_ENDPOINT)
	.setProject(RASENGAN_APPWRITE_PROJECT_ID);

// Database
export const databases = new Databases(client);
export const collections = {
	USERS: "users",
	ORDERS: "orders",
} as const;

// Appwrite Services
export const account = new Account(client);
export const avatars = new Avatars(client);
export { ID };
