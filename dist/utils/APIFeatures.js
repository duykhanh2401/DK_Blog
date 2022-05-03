"use strict";
// import { QueryOptions } from 'mongoose';
// class APIFeatures {
// 	public query: QueryOptions;
// 	public queryString: object;
// 	constructor(query: QueryOptions, queryString: object) {
// 		this.query = query;
// 		this.queryString = queryString;
// 	}
// 	filter() {
// 		const queryObj = { ...this.queryString };
// 		const excludedFields = ['page', 'sort', 'limit', 'fields'];
// 		excludedFields.forEach((el:string) => {
// 			delete queryObj[el];
// 		});
// 		// 1B) Advanced filtering
// 		let queryStr = JSON.stringify(queryObj);
// 		// Convert req.query to format query mongoDB advanced filtering
// 		queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
// 		this.query = this.query.find(JSON.parse(queryStr));
// 		return this;
// 	}
// 	sort() {
// 		if (this.queryString.sort) {
// 			const sortBy = this.queryString.sort.split(',').join(' ');
// 			this.query = this.query.sort(sortBy);
// 		} else {
// 			this.query = this.query.sort('-createdAt');
// 		}
// 		return this;
// 	}
// 	limitFields() {
// 		if (this.queryString.fields) {
// 			const limit = this.queryString.fields.split(',').join(' ');
// 			this.query = this.query.select(limit);
// 		} else {
// 			this.query = this.query.select('-__v');
// 		}
// 		return this;
// 	}
// 	paginate() {
// 		const page = this.queryString.page * 1 || 1;
// 		const limit = this.queryString.limit * 1 || 1000000;
// 		const skip = (page - 1) * limit;
// 		this.query = this.query.skip(skip).limit(limit);
// 		return this;
// 	}
// }
// module.exports = APIFeatures;
