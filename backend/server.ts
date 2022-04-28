import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { app } from './app';

dotenv.config({ path: './backend/config.env' });
const URI = process.env.DATABASE_LOCAL;
mongoose
	// .connect(DB, {
	.connect(`${URI}`)
	.then(() => {
		console.log('DB connections successful!!!');
	})
	.catch((err) => {
		console.log(err);
	});

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
	console.log(`App running on port http://localhost:${port}`);
});
