import { IBlog } from '../../utils/TypeScript';
import {
	CREATE_BLOG,
	DELETE_BLOG,
	GET_BLOGS,
	IBlogType,
	UPDATE_BLOG,
} from '../types/blogType';

const blogsUserReducer = (state: IBlog[] = [], action: IBlogType): IBlog[] => {
	switch (action.type) {
		case GET_BLOGS:
			return action.payload;

		case CREATE_BLOG:
			return [action.payload, ...state];

		case DELETE_BLOG:
			return state.filter((item) => item._id !== action.payload);
		case UPDATE_BLOG:
			return state.map((item) =>
				item._id === action.payload._id
					? {
							...item,
							...action.payload,
					  }
					: item,
			);
		default:
			return state;
	}
};

export default blogsUserReducer;
