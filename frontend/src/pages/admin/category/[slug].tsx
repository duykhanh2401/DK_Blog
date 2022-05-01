import React from 'react';
import { useParams } from 'react-router-dom';
import { IParams } from '../../../utils/TypeScript';
import CreateCategory from './../createCategory';

const UpdateBlog = () => {
	const { slug } = useParams();
	return <CreateCategory id={slug} />;
};

export default UpdateBlog;
