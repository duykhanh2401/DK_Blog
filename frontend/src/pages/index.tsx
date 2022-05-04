import React from 'react';
import { useSelector } from 'react-redux';
import { RootStore } from '../utils/TypeScript';
import Card from './../components/Card';

const Index = () => {
	const { blog } = useSelector((state: RootStore) => state);
	return (
		<main>
			<div className="blog-widget-title">Bài đăng mới nhất</div>
			<div className="blog-posts">
				{blog.map((el, index) => {
					return <Card blog={el} key={index} />;
				})}
			</div>
		</main>
	);
};

export default Index;
