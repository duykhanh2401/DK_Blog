import React, { useEffect, useState } from 'react';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';

import { NavLink } from 'react-router-dom';
import { IBlog, InputChange, RootStore } from '../../utils/TypeScript';
import Card from './../../components/Card';
import { useSelector, useDispatch } from 'react-redux';
import { createBlog } from '../../redux/actions/blogAction';
import { updateBlog } from './../../redux/actions/blogAction';
import { UploadImage } from './../../utils/UploadImage';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('typescript', typescript);

const mdParser = new MarkdownIt(/* Markdown-it options */);
mdParser.use(require('markdown-it-ins'));
mdParser.use(require('markdown-it-highlightjs'), { hljs });

interface IProps {
	id?: string;
}
const CreateBlog: React.FC<IProps> = ({ id }) => {
	const [value, setValue] = React.useState('');

	const initState = {
		user: '',
		title: '',
		content: '',
		description: '',
		thumbnail: '',
		category: '',
		createdAt: new Date().toISOString(),
		slug: '',
		_id: '',
	};
	const [blogState, setBlog] = useState<IBlog>(initState);

	const { auth, category, blog } = useSelector((state: RootStore) => state);

	const [isUpdate, setUpdate] = useState<boolean>(false);

	const dispatch = useDispatch();

	useEffect(() => {
		if (!id) return;

		const oldData = blog.find((el) => el._id === id);
		if (oldData) {
			setBlog(oldData);
			setValue(oldData.content);
			setUpdate(true);
			setUpdate(true);
		}
	}, [blog, id]);

	const handleEditorChange = (data: { text: string; html: string }) => {
		setValue(data.text);
	};

	const handleChangeThumbnail = (e: InputChange) => {
		const target = e.target as HTMLInputElement;
		const files = target.files;
		if (files) {
			const file = files[0];
			setBlog({ ...blogState, thumbnail: file });
		}
	};

	const handleChangeInput = (e: InputChange) => {
		const { value, name } = e.target;
		setBlog({ ...blogState, [name]: value });
	};

	const handleSubmit = async () => {
		if (!auth.accessToken) return;
		if (!auth.user) return;
		let newData = { ...blogState, content: value, user: auth.user._id };
		if (isUpdate) {
			return dispatch(updateBlog(newData, auth.accessToken));
		}
		dispatch(createBlog(newData, auth.accessToken));
	};

	const onImageUpload = (file: File) => {
		return new Promise((resolve, reject) => {
			UploadImage(file).then((response) => {
				resolve(response);
			});
		});
	};
	return (
		<div className="category-main">
			<div className="category-header">
				<h2 className="category-title">
					{isUpdate ? 'Cập nhật bài viết' : 'Thêm mới bài viết'}
				</h2>

				<NavLink to="/admin/blog" className="btn">
					Quay lại
				</NavLink>
			</div>
			<div className="blog-body">
				<div className="body-left">
					<div className="item-category">
						<label htmlFor="titleBlog" className="label-category">
							Tên bài viết
						</label>
						<input
							type="text"
							id="titleBlog"
							className="form-control"
							name="title"
							onChange={handleChangeInput}
							value={blogState.title}
						/>
					</div>
					<div className="item-category">
						<label htmlFor="thumbnail" className="label-category">
							Ảnh bìa
						</label>
						<input
							type="file"
							id="thumbnail"
							onChange={handleChangeThumbnail}
							className="form-control"
						/>
					</div>
					<div className="item-category">
						<label htmlFor="category" className="label-category">
							Tên danh mục
						</label>
						<select
							id="category"
							className="form-control"
							name="category"
							onChange={handleChangeInput}
							value={blogState.category}
						>
							<option value="">Chọn danh mục</option>
							{category.map((el) => (
								<option key={el._id} value={el._id}>
									{el.name}
								</option>
							))}
						</select>
					</div>
				</div>
				<div className="body-right">
					<Card blog={blogState} />
				</div>
			</div>
			<div className="editor">
				<MdEditor
					style={{ height: '500px' }}
					renderHTML={(text) => mdParser.render(text)}
					onChange={handleEditorChange}
					value={value}
					onImageUpload={onImageUpload}
				/>
			</div>
			<button className="button-submit-category btn" onClick={handleSubmit}>
				Thêm mới
			</button>
		</div>
	);
};

export default CreateBlog;
