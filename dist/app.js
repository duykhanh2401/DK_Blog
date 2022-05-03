"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const express_rate_limit_1 = require("express-rate-limit");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
const helmet_1 = require("helmet");
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const categoriesRoutes_1 = __importDefault(require("./routes/categoriesRoutes"));
const blogRoutes_1 = __importDefault(require("./routes/blogRoutes"));
const errorController_1 = __importDefault(require("./controllers/errorController"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
exports.app = app;
console.log(process.env.NODE_ENV);
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, express_mongo_sanitize_1.default)());
app.use((0, helmet_1.xssFilter)());
const limiter = (0, express_rate_limit_1.rateLimit)({
    windowMs: 30 * 60 * 1000,
    max: 1000,
    message: 'Too many accounts created from this IP, please try again after 30m',
});
app.use('/api', limiter);
app.use('/api/auth', authRoutes_1.default);
app.use('/api/category', categoriesRoutes_1.default);
app.use('/api/blog', blogRoutes_1.default);
app.use(express_1.default.static('frontend/build'));
app.get('*', (req, res, next) => {
    res.sendFile(path_1.default.join(__dirname, '../frontend', 'build', 'index.html'));
});
app.use(errorController_1.default);
