import mongoose, { Document } from 'mongoose';
import { Request } from 'express';
export interface IUser extends Document {
	name: string;
	email: string;
	password: string;
	role: string;
	createdAt?: Date;
	_doc?: object;
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

export interface ICategory extends Document {
	name: string;
	slug: string;
	createdAt?: Date;
}

export interface IReqAuth extends Request {
	user?: IUser;
}

export interface IBlog extends Document {
	user?: mongoose.Types.ObjectId;
	title: string;
	content: string;
	thumbnail: string;
	slug: string;
	category?: mongoose.Types.ObjectId;
	createdAt?: Date;
}
