import { Client, Account } from "appwrite";

const { RASENGAN_APPWRITE_ENDPOINT, RASENGAN_APPWRITE_PROJECT_ID } = import.meta
	.env;

export const client = new Client();

client
	.setEndpoint(RASENGAN_APPWRITE_ENDPOINT)
	.setProject(RASENGAN_APPWRITE_PROJECT_ID);

export const account = new Account(client);
export { ID } from "appwrite";
