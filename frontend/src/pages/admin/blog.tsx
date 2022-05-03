import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootStore } from '../../utils/TypeScript';
import { deleteCategory } from '../../redux/actions/categoryAction';
import { deleteBlog } from '../../redux/actions/blogAction';

const Blog = () => {
	const { category, blog, auth } = useSelector((state: RootStore) => state);

	const dispatch = useDispatch();

	const handleDelete = (id: string) => {
		if (!auth.accessToken) return;
		if (window.confirm('Bạn có muốn xoá bài viết này không ?')) {
			dispatch(deleteBlog(id, auth.accessToken));
		}
	};
	return (
		<div className="category-main">
			<div className="category-header">
				<h2 className="category-title">Danh sách bài viết</h2>
				<NavLink to="/admin/createBlog" className="category-new btn">
					Thêm mới
				</NavLink>
			</div>
			<div className="category-body">
				<table className="table">
					<thead>
						<tr>
							<th className="col">Tên bài viết</th>
							<th className="col">Slug</th>
							<th className="col">Danh mục</th>
							<th className="col">Ngày đăng</th>
							<th className="col"></th>
						</tr>
					</thead>
					<tbody>
						{blog.map((el, index) => {
							return (
								<tr className="item-list" key={index}>
									<td className="name" data-label="Tên danh mục">
										{el.title}
									</td>
									<td className="slug" data-label="Slug">
										{el.slug}
									</td>
									<td className="category-blog" data-label="Danh mục">
										{
											category.find((element) => element._id === el.category)
												?.name
										}
									</td>
									<td className="date" data-label="Ngày đăng">
										{new Date(el.createdAt).toLocaleDateString('vi')}
									</td>
									<td className="nav-btn">
										<NavLink
											to={`/admin/blog/${el._id}`}
											className="update-btn"
										>
											<i className="bx bxs-edit-alt"></i>Sửa
										</NavLink>
										<div
											className="delete-btn"
											onClick={() => handleDelete(el._id)}
										>
											<i className="bx bx-trash"></i>
											Xoá
										</div>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Blog;
