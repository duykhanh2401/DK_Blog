import mongoose from 'mongoose';
import { ICategory } from '../config/interface';
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);
const categorySchema = new mongoose.Schema<ICategory>(
	{
		name: {
			type: String,
			required: [true, 'Vui lòng nhập tên danh mục'],
			trim: true,
			unique: true,
		},
		privacy: {
			type: String,
			enum: ['public', 'private'],
			required: true,
		},
		createdAt: { type: Date, default: Date.now() },
		slug: { type: String, slug: 'name', unique: true },
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	},
);

export default mongoose.model<ICategory>('Category', categorySchema);
