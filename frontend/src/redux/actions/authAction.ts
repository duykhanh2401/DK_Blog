import { IUserLogin } from '../../utils/TypeScript';
import { postAPI } from '../../utils/FetchData';
import { AUTH, IAuthType } from '../types/authType';
import { IAlertType, ALERT } from '../types/alertType';
import { Dispatch } from 'react';
import { toast } from 'react-toastify';
export const login =
	(userLogin: IUserLogin) =>
	async (dispatch: Dispatch<IAuthType | IAlertType>) => {
		try {
			dispatch({ type: ALERT, payload: { loading: true } });
			const res = await postAPI('/auth/login', userLogin);

			dispatch({
				type: AUTH,
				payload: {
					token: res.data.token,
					user: res.data.user,
				},
			});
			dispatch({ type: ALERT, payload: { loading: false } });

			toast.success('Đăng nhập thành công');
		} catch (error) {
			dispatch({ type: ALERT, payload: { loading: false } });

			toast.error('Đăng nhập thất bại');
		}
	};
