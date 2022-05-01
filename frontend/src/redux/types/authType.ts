import { IUser } from '../../utils/TypeScript';

export const AUTH = 'AUTH';

export interface IAuthType {
	type: typeof AUTH;
	payload: IAuth;
}

export interface IAuth {
	accessToken?: string;
	user?: IUser;
}
