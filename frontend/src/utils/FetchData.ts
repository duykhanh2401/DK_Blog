import axios from 'axios';

export const postAPI = async (url: string, post: object) => {
	const res = await axios.post(`/api/${url}`, post);
	return res;
};
