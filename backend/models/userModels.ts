import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';
import { IUser } from '../config/interface';
const userSchema = new mongoose.Schema<IUser>(
	{
		name: {
			type: String,
			required: [true, 'Vui lòng nhập tên'],
			trim: true,
		},
		email: {
			type: String,
			required: [true, 'Vui lòng nhập email'],
			unique: true,
			lowercase: true,
			validate: [validator.isEmail, 'Đây không phải là email'],
		},
		password: {
			type: String,
			required: [true, 'Vui lòng nhập mật khẩu'],
			trim: true,
			select: false,
		},
		role: {
			type: String,
			enum: ['admin', 'user'],
			default: 'user',
		},
		createdAt: {
			type: Date,
			default: Date.now(),
		},
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	},
);

// Mã hoá mật khẩu

userSchema.methods.correctPassword = async function (userPassword: string) {
	return await bcrypt.compare(userPassword, this.password);
};
export default mongoose.model<IUser>('User', userSchema);
