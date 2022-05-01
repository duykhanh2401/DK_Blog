import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootStore } from '../../utils/TypeScript';
import { deleteCategory } from '../../redux/actions/categoryAction';

const Category = () => {
	const { category, auth } = useSelector((state: RootStore) => state);

	const dispatch = useDispatch();

	const handleDelete = (id: string) => {
		if (!auth.accessToken) return;
		if (window.confirm('Are you sure to delete this category?')) {
			dispatch(deleteCategory(id, auth.accessToken));
		}
	};
	return (
		<div className="category-main">
			<div className="category-header">
				<h2 className="category-title">Danh sách danh mục</h2>
				<NavLink to="/admin/createCategory" className="category-new btn">
					Thêm mới
				</NavLink>
			</div>
			<div className="category-body">
				<table className="table">
					<thead>
						<tr>
							<th className="col">Tên danh mục</th>
							<th className="col">Slug</th>
							<th className="col">Ngày đăng</th>
							<th className="col">Quyền riêng tư</th>
							<th className="col"></th>
						</tr>
					</thead>
					<tbody>
						{category.map((el, index) => {
							return (
								<tr className="item-list" key={index}>
									<td className="name" data-label="Tên danh mục">
										{el.name}
									</td>
									<td className="slug" data-label="Slug">
										{el.slug}
									</td>
									<td className="date" data-label="Ngày đăng">
										{new Date(el.createdAt).toLocaleDateString('vi')}
									</td>
									<td className="name" data-label="Quyền riêng tư">
										{el.privacy === 'public' ? 'Công khai' : 'Riêng tư'}
									</td>
									<td className="nav-btn">
										<NavLink
											to={`/admin/category/${el._id}`}
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

export default Category;
