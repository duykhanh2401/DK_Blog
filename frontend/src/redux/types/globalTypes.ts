import { IAuth, IUser } from '../../utils/TypeScript';

export const AUTH = 'AUTH';

export interface IAuthType {
	type: typeof AUTH;
	payload: {
		token: string;
		user: IUser;
	};
}

export type GlobalType = IAuthType;
