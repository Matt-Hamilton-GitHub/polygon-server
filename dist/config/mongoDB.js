"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { MANGO_USERNAME, MANGO_PASSWORD_OAKLINE } = process.env;
if (!MANGO_USERNAME || !MANGO_PASSWORD_OAKLINE) {
    throw new Error('Missing MongoDB credentials in .env');
}
const MONGO_OAKLINE_URL = `mongodb+srv://${encodeURIComponent(MANGO_USERNAME)}:${encodeURIComponent(MANGO_PASSWORD_OAKLINE)}@oakline-cluster-aws.mvm1w6a.mongodb.net/?appName=oakline-cluster-aws`;
const connectToOakLine = async () => {
    try {
        await mongoose_1.default.connect(MONGO_OAKLINE_URL, { dbName: 'oakline' });
        console.log(`MongoDB Connected successfully to ${mongoose_1.default.connection.name}`);
    }
    catch (err) {
        console.error(err instanceof Error ? err.message : err);
        process.exit(1);
    }
};
exports.default = connectToOakLine;
//# sourceMappingURL=mongoDB.js.map