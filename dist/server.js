"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = require("./app");
dotenv_1.default.config({ path: './backend/config.env' });
const URI = process.env.DATABASE_LOCAL;
mongoose_1.default
    // .connect(DB, {
    .connect(`${URI}`)
    .then(() => {
    console.log('DB connections successful!!!');
})
    .catch((err) => {
    console.log(err);
});
const port = process.env.PORT || 3000;
const server = app_1.app.listen(port, () => {
    console.log(`App running on port http://localhost:${port}`);
});
