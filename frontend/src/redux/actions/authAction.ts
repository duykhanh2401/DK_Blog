import { IUserLogin } from '../../utils/TypeScript';
import { getAPI, postAPI } from '../../utils/FetchData';
import { AUTH, IAuthType } from '../types/authType';
import { IAlertType, ALERT } from '../types/alertType';
import { Dispatch } from 'react';
import { toast } from 'react-toastify';
export const login =
	(userLogin: IUserLogin) =>
	async (dispatch: Dispatch<IAuthType | IAlertType>) => {
		try {
			dispatch({ type: ALERT, payload: { loading: true } });
			const res = await postAPI('auth/login', userLogin);

			dispatch({
				type: AUTH,
				payload: {
					accessToken: res.data.accessToken,
					user: res.data.user,
				},
			});
			dispatch({ type: ALERT, payload: { loading: false } });
			localStorage.setItem('logged', 'true');
			toast.success('Đăng nhập thành công');
		} catch (error) {
			dispatch({ type: ALERT, payload: { loading: false } });

			toast.error('Đăng nhập thất bại');
		}
	};

export const refreshToken =
	() => async (dispatch: Dispatch<IAuthType | IAlertType>) => {
		const logged = localStorage.getItem('logged');
		if (logged !== 'true') {
			return;
		}

		try {
			dispatch({ type: ALERT, payload: { loading: true } });
			const res = await getAPI('auth/refreshToken');
			dispatch({ type: AUTH, payload: res.data });

			dispatch({ type: ALERT, payload: {} });
		} catch (error: any) {
			toast.error(error.response.data.msg);
			dispatch({ type: ALERT, payload: {} });
		}
	};

export const logout =
	() => async (dispatch: Dispatch<IAuthType | IAlertType>) => {
		localStorage.removeItem('logged');
		await getAPI('auth/logout');
		window.location.reload();
	};
