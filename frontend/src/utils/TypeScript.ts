import { ChangeEvent, FormEvent } from 'react';
import rootReducer from '../redux/reducers/index';
export type InputChange = ChangeEvent<HTMLInputElement | HTMLSelectElement>;

export type FormSubmit = FormEvent<HTMLFormElement>;

export type RootStore = ReturnType<typeof rootReducer>;
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

export interface IAlert {
	loading?: boolean;
	success?: string | string[];
	error?: string | string[];
}

export interface ICategory {
	_id: string;
	name: string;
	createdAt: Date;
	privacy: string;
	slug: string;
}
