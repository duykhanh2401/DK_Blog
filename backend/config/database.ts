import mongoose from 'mongoose';

const URI = process.env.DATABASE_LOCAL;
console.log(URI);
mongoose
	// .connect(DB, {
	.connect(`${URI}`, {
		// useNewUrlParser: true,
		// useUnifiedTopology: true,
	})
	.then(() => {
		console.log('DB connections successful!!!');
	});
