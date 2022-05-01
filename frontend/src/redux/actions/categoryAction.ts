import { Dispatch } from 'redux';
import { ALERT, IAlertType } from '../types/alertType';

import { postAPI, getAPI, patchAPI, deleteAPI } from '../../utils/FetchData';
import { ICategory, RootStore } from '../../utils/TypeScript';

import {
	CREATE_CATEGORY,
	ICategoryType,
	GET_CATEGORIES,
	UPDATE_CATEGORY,
	DELETE_CATEGORY,
} from '../types/categoryType';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

export const CreateCategoryAction =
	(name: string, privacy: string, token: string) =>
	async (dispatch: Dispatch<IAlertType | ICategoryType>) => {
		try {
			dispatch({ type: ALERT, payload: { loading: true } });

			const res = await postAPI('category', { name, privacy }, token);
			dispatch({
				type: CREATE_CATEGORY,
				payload: res.data.category,
			});

			dispatch({ type: ALERT, payload: { loading: false } });
		} catch (error: any) {
			dispatch({ type: ALERT, payload: { loading: false } });
			toast.error(error.response.data.message);
		}
	};

export const getCategories =
	(token?: string) =>
	async (dispatch: Dispatch<IAlertType | ICategoryType>) => {
		try {
			dispatch({ type: ALERT, payload: { loading: true } });
			const res = await getAPI('category', token);

			dispatch({
				type: GET_CATEGORIES,
				payload: res.data.data,
			});

			dispatch({ type: ALERT, payload: { loading: false } });
		} catch (error: any) {
			console.log(error);
			dispatch({ type: ALERT, payload: { loading: false } });
		}
	};

export const updateCategory =
	(data: ICategory, token: string) =>
	async (dispatch: Dispatch<IAlertType | ICategoryType>) => {
		try {
			const res = await patchAPI(
				`category/${data._id}`,
				{
					name: data.name,
					privacy: data.privacy,
					slug: data.slug,
				},
				token,
			);
			dispatch({ type: UPDATE_CATEGORY, payload: res.data.data });
		} catch (error: any) {
			console.log(error.response);
		}
	};

export const deleteCategory =
	(id: string, token: string) =>
	async (dispatch: Dispatch<IAlertType | ICategoryType>) => {
		try {
			const res = await deleteAPI(`category/${id}`, token);
			if (res.status === 204) dispatch({ type: DELETE_CATEGORY, payload: id });
		} catch (error: any) {
			toast.error(error.response.data.msg);
		}
	};
