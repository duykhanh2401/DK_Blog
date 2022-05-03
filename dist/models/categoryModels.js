"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const slug = require('mongoose-slug-generator');
mongoose_1.default.plugin(slug);
const categorySchema = new mongoose_1.default.Schema({
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
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});
exports.default = mongoose_1.default.model('Category', categorySchema);
