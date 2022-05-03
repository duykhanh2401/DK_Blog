import axios from 'axios';

export const UploadImage = async (file: File) => {
	const formData = new FormData();
	formData.append('file', file);
	formData.append('upload_preset', 'BlogApp');
	formData.append('cloud_name', 'duykhanh2401');

	const { data } = await axios.post(
		'https://api.cloudinary.com/v1_1/duykhanh2401/image/upload',
		formData,
	);

	return data.secure_url;
};
