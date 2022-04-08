import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
			unique: true,
		},
		createdAt: { type: Date, default: Date.now() },
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	},
);

export default mongoose.model('Category', categorySchema);
