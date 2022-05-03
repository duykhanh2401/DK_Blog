import mongoose from 'mongoose';
import { IBlog } from '../config/interface';
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

const blogSchema = new mongoose.Schema<IBlog>(
	{
		user: {
			type: mongoose.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		title: {
			type: String,
			required: true,
		},
		content: {
			type: String,
			required: true,
		},
		thumbnail: String,
		slug: { type: String, slug: 'title', unique: true },
		category: {
			type: mongoose.Types.ObjectId,
			ref: 'Category',
			required: true,
		},
		createdAt: { type: Date, default: Date.now() },
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	},
);

export default mongoose.model<IBlog>('Blog', blogSchema);
