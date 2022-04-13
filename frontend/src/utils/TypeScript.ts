import { ChangeEvent } from 'react';

export type InputChange = ChangeEvent<HTMLInputElement>;
export interface IParams {
	page: string;
	slug: string;
}

export interface IUserLogin {
	email: string;
	password: string;
}

export interface IUser {
	email: string;
	name: string;
	role: string;
}
export interface IAuth {
	token: string;
	user: IUser;
}
