import { ADMIN_PASSCODE } from '../config/constants.js';

export const adminAuth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Simple token verification (in production, use JWT)
  if (token !== Buffer.from(`admin:${ADMIN_PASSCODE}`).toString('base64')) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  next();
};
