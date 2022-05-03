"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const slug = require('mongoose-slug-generator');
mongoose_1.default.plugin(slug);
const blogSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Types.ObjectId,
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
        type: mongoose_1.default.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    createdAt: { type: Date, default: Date.now() },
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});
exports.default = mongoose_1.default.model('Blog', blogSchema);
