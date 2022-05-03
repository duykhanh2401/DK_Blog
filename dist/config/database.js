"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const URI = process.env.DATABASE_LOCAL;
console.log(URI);
mongoose_1.default
    // .connect(DB, {
    .connect(`${URI}`, {
// useNewUrlParser: true,
// useUnifiedTopology: true,
})
    .then(() => {
    console.log('DB connections successful!!!');
});
