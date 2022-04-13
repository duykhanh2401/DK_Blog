import { Document } from 'mongoose';

export interface IUser extends Document {
	name: string;
	email: string;
	password: string;
	role: string;
	createdAt?: Date;
}

export interface INewUser {
	email: string;
	name: string;
	password: string;
	passwordConfirm: string;
}

export interface IDecodedToken {
	newUser?: INewUser;
	iat: number;
	exp: number;
	id?: string;
}
