import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FormSubmit, RootStore } from '../../utils/TypeScript';
import { useSelector, useDispatch } from 'react-redux';
import {
	CreateCategoryAction,
	deleteCategory,
	updateCategory,
} from '../../redux/actions/categoryAction';
import { ICategory } from './../../utils/TypeScript';
interface IProps {
	id?: string;
}
const CreateCategory: React.FC<IProps> = ({ id }) => {
	const initState = {
		_id: '',
		name: '',
		createdAt: new Date(),
		slug: '',
		privacy: '',
	};

	const [categoryUpdate, setCategoryUpdate] = useState<ICategory>(initState);
	const [selectPrivacy, setPrivacy] = useState<string>('public');

	const [name, setName] = useState<string>('');
	const [slug, setSlug] = useState<string>('');

	const { auth, category } = useSelector((state: RootStore) => state);

	const [isUpdate, setUpdate] = useState<boolean>(false);
	const dispatch = useDispatch();

	const radioHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPrivacy(event.target.value);
	};

	useEffect(() => {
		if (!id) return;

		const oldData = category.find((el) => el._id === id);
		if (oldData) {
			setName(oldData.name);
			setPrivacy(oldData.privacy);
			setSlug(oldData.slug);
			setUpdate(true);
			setCategoryUpdate(oldData);
		}
	}, [category, id]);

	const handleSubmit = (e: FormSubmit) => {
		e.preventDefault();
		if (!auth.accessToken || !name) return;
		if (isUpdate) {
			return dispatch(
				updateCategory(
					{ ...categoryUpdate, name, slug, privacy: selectPrivacy },
					auth.accessToken,
				),
			);
		}
		dispatch(CreateCategoryAction(name, selectPrivacy, auth.accessToken));
	};

	return (
		<div className="category-main">
			<div className="category-header">
				<h2 className="category-title">
					{isUpdate ? 'Cập nhật danh mục' : 'Thêm mới danh mục'}
				</h2>
				<NavLink to="/admin/category" className="btn">
					Quay lại
				</NavLink>
			</div>
			<div className="category-body">
				<form onSubmit={handleSubmit}>
					<div className="item-category">
						<label htmlFor="nameCategory" className="label-category">
							Tên danh mục
						</label>
						<input
							type="text"
							id="nameCategory"
							className="form-control"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</div>
					{isUpdate && (
						<div className="item-category">
							<label htmlFor="slugCategory" className="label-category">
								Slug
							</label>
							<input
								type="text"
								id="slugCategory"
								className="form-control"
								value={slug}
								onChange={(e) => setSlug(e.target.value)}
							/>
						</div>
					)}
					<div className="item-category">
						<label htmlFor="privateCategory" className="label-category">
							Quyền riêng tư:
						</label>
						<div>
							<input
								type="radio"
								id="public"
								name="privacyCategory"
								onChange={radioHandler}
								value="public"
								checked={selectPrivacy === 'public'}
							></input>
							<label htmlFor="public">Công khai</label>
						</div>
						<div>
							<input
								type="radio"
								id="private"
								name="privacyCategory"
								onChange={radioHandler}
								value="private"
								checked={selectPrivacy === 'private'}
							></input>
							<label htmlFor="private">Riêng tư</label>
						</div>
					</div>
					<button className="button-submit-category btn">
						{isUpdate ? 'Cập nhật' : 'Thêm mới'}
					</button>
				</form>
			</div>
		</div>
	);
};

export default CreateCategory;
