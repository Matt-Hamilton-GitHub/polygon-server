import type { Request, Response, NextFunction } from 'express';
import { createHash, timingSafeEqual } from 'crypto';

const sha256 = (value: string) => createHash('sha256').update(value).digest();

const authenticateRequest = (req: Request, res: Response, next: NextFunction): void => {
  const expected = process.env.APP_KEY_AUTH;

  if (!expected) {
    console.error('APP_KEY_AUTH is not set');
    res.status(500).json({ msg: 'Server misconfigured' });
    return;
  }

  const provided = req.headers['app-auth-key'];

  // hashing gives equal-length buffers, which timingSafeEqual requires
  if (typeof provided !== 'string' || !timingSafeEqual(sha256(provided), sha256(expected))) {
    res.status(401).json({ msg: 'Unauthorized: Missing or invalid API key' });
    return;
  }

  next();
};

export default authenticateRequest;