import { Dispatch } from 'redux';
import {
	getAPI,
	postAPI,
	putAPI,
	patchAPI,
	deleteAPI,
} from '../../utils/FetchData';
import { IBlog } from '../../utils/TypeScript';
import { UploadImage } from '../../utils/UploadImage';
import { ALERT, IAlertType } from '../types/alertType';
import {
	CREATE_BLOG,
	DELETE_BLOG,
	GET_BLOGS,
	IBlogType,
	ICreateBlog,
	UPDATE_BLOG,
} from '../types/blogType';

export const createBlog =
	(blog: IBlog, token: string) =>
	async (dispatch: Dispatch<IAlertType | ICreateBlog>) => {
		let url;
		try {
			dispatch({ type: ALERT, payload: { loading: true } });

			if (typeof blog.thumbnail !== 'string') {
				const photo = await UploadImage(blog.thumbnail);
				url = photo;
			} else {
				url = blog.thumbnail;
			}

			const newBlog = { ...blog, thumbnail: url };
			console.log(newBlog);
			const res = await postAPI('blog', newBlog, token);

			dispatch({
				type: CREATE_BLOG,
				payload: res.data,
			});

			dispatch({ type: ALERT, payload: { loading: false } });
		} catch (err: any) {
			dispatch({ type: ALERT, payload: { loading: false } });
			console.log(err.response.data);
		}
	};

export const getHomeBlogs =
	() => async (dispatch: Dispatch<IAlertType | IBlogType>) => {
		try {
			dispatch({ type: ALERT, payload: { loading: true } });

			const res = await getAPI('home/blogs');

			dispatch({
				type: GET_BLOGS,
				payload: res.data,
			});

			dispatch({ type: ALERT, payload: { loading: false } });
		} catch (err: any) {
			console.log(err.response.data);
		}
	};

export const getBlogs =
	() => async (dispatch: Dispatch<IAlertType | IBlogType>) => {
		try {
			dispatch({ type: ALERT, payload: { loading: true } });

			const res = await getAPI('blog');

			dispatch({
				type: GET_BLOGS,
				payload: res.data.data,
			});

			dispatch({ type: ALERT, payload: { loading: false } });
		} catch (err: any) {
			console.log(err.response.data);
		}
	};

export const getBlogsByCategoryId =
	(id: string, search: string) =>
	async (dispatch: Dispatch<IAlertType | IBlogType>) => {
		try {
			let limit = 8;
			let value = search ? search : `?page=${1}`;

			dispatch({ type: ALERT, payload: { loading: true } });

			const res = await getAPI(`blogs/category/${id}${value}&limit=${limit}`);

			dispatch({
				type: GET_BLOGS,
				payload: { ...res.data, id, search },
			});

			dispatch({ type: ALERT, payload: { loading: false } });
		} catch (err: any) {
			console.log(err.response.data);
		}
	};

export const updateBlog =
	(blog: IBlog, token: string) =>
	async (dispatch: Dispatch<IAlertType | IBlogType>) => {
		let url;
		try {
			dispatch({ type: ALERT, payload: { loading: true } });

			if (typeof blog.thumbnail !== 'string') {
				const photo = await UploadImage(blog.thumbnail);
				url = photo;
			} else {
				url = blog.thumbnail;
			}

			const newBlog = { ...blog, thumbnail: url };

			const res = await patchAPI(`blog/${newBlog._id}`, newBlog, token);
			dispatch({ type: UPDATE_BLOG, payload: res.data.data });
			dispatch({ type: ALERT, payload: { loading: false } });
		} catch (err: any) {
			dispatch({ type: ALERT, payload: { loading: false } });

			console.log(err.response.data);
		}
	};

export const deleteBlog =
	(id: string, token: string) =>
	async (dispatch: Dispatch<IAlertType | IBlogType>) => {
		try {
			const res = await deleteAPI(`blog/${id}`, token);
			if (res.status === 204) dispatch({ type: DELETE_BLOG, payload: id });
		} catch (err: any) {
			console.log(err.response.data);
		}
	};
