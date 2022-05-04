import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { IBlog, RootStore } from '../utils/TypeScript';

interface IProps {
	blog: IBlog;
}

const Card: React.FC<IProps> = ({ blog }) => {
	const { category } = useSelector((state: RootStore) => state);
	const [categoryRender, setCategoryRender] = useState({
		name: '',
		slug: '',
	});
	useEffect(() => {
		const el = category.find((el) => el._id === blog.category);
		if (el) {
			setCategoryRender({ name: el.name, slug: el.slug });
		}
	}, [blog.category, category]);
	return (
		<div className="post-cart">
			<div className="post-thumbnail">
				<NavLink to={`/blog/${blog.slug}`}>
					{blog.thumbnail && (
						<>
							{typeof blog.thumbnail === 'string' ? (
								// <NavLink to={`/blog/${blog._id}`}>
								<img src={blog.thumbnail} alt="" />
							) : (
								// </NavLink>
								<img src={URL.createObjectURL(blog.thumbnail)} alt="" />
							)}
						</>
					)}
				</NavLink>
			</div>
			<div className="post-content">
				<div className="post-container">
					<div className="post-category">
						<NavLink to={`/category/${categoryRender.slug}`}>
							#{categoryRender.name}
						</NavLink>
					</div>
					<div className="post-title">
						<NavLink to={`/blog/${blog.slug}`}>{blog.title}</NavLink>
					</div>
					<div className="post-info">
						<div className="post-author">Duy Khánh</div>
						<div className="post-published">
							{new Date(blog.createdAt).toLocaleDateString('vi')}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Card;
