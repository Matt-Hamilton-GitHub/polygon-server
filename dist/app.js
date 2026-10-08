"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const mongoDB_1 = __importDefault(require("./config/mongoDB"));
const oaklineRoutes_1 = __importDefault(require("./routes/oaklineRoutes"));
(0, mongoDB_1.default)();
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)()); // sets secure HTTP headers
app.use(express_1.default.json());
app.use('/api/v2/', oaklineRoutes_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map