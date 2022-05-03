import { IBlog } from '../../utils/TypeScript';

export const CREATE_BLOG = 'CREATE_BLOG';
export const GET_BLOGS = 'GET_BLOGS';
export const UPDATE_BLOG = 'UPDATE_BLOG';
export const DELETE_BLOG = 'DELETE_BLOG';

export interface ICreateBlog {
	type: typeof CREATE_BLOG;
	payload: IBlog;
}

export interface IGetBlogs {
	type: typeof GET_BLOGS;
	payload: IBlog[];
}

export interface IUpdateBlog {
	type: typeof UPDATE_BLOG;
	payload: IBlog;
}

export interface IDeleteBlog {
	type: typeof DELETE_BLOG;
	payload: string;
}

export type IBlogType = ICreateBlog | IGetBlogs | IUpdateBlog | IDeleteBlog;
