import React from 'react';
import { useParams } from 'react-router-dom';
import { RootStore } from '../../utils/TypeScript';
import { useSelector } from 'react-redux';
import Card from '../../components/Card';

const CategoryPage = () => {
	const { slug } = useParams();
	const { blog, category } = useSelector((state: RootStore) => state);

	const categoryCurrent = category.find((el) => el.slug === slug);

	const blogRender = blog.filter((el) => {
		return el.category === categoryCurrent?._id;
	});
	return (
		<div className="blog-posts">
			{blogRender.map((el, index) => {
				return <Card blog={el} key={index} />;
			})}
		</div>
	);
};

export default CategoryPage;
