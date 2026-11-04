export interface IUser {
	id: string;
	name: string;
	email: string;
	avatar?: string;
}

export default class User {
	private _id: string;
	private _name: string;
	private _email: string;
	private _avatar?: string;

	constructor(user: IUser) {
		this._id = user.id;
		this._name = user.name;
		this._email = user.email;
		this._avatar = user.avatar;
	}

	get id() {
		return this._id;
	}

	get name() {
		return this._name;
	}

	get email() {
		return this._email;
	}

	get avatar() {
		return this._avatar;
	}
}
