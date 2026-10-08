"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
const sha256 = (value) => (0, crypto_1.createHash)('sha256').update(value).digest();
const authenticateRequest = (req, res, next) => {
    const expected = process.env.APP_KEY_AUTH;
    if (!expected) {
        console.error('APP_KEY_AUTH is not set');
        res.status(500).json({ msg: 'Server misconfigured' });
        return;
    }
    const provided = req.headers['app-auth-key'];
    // hashing gives equal-length buffers, which timingSafeEqual requires
    if (typeof provided !== 'string' || !(0, crypto_1.timingSafeEqual)(sha256(provided), sha256(expected))) {
        res.status(401).json({ msg: 'Unauthorized: Missing or invalid API key' });
        return;
    }
    next();
};
exports.default = authenticateRequest;
//# sourceMappingURL=authMiddleware.js.map