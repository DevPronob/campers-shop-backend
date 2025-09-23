import jwt, { JwtPayload } from 'jsonwebtoken';

interface TokenPayload {
  _id: string;
  email: string;
  role: string;
  // add more fields if needed
}

export const generateToken = (payload: TokenPayload, secret: string): string => {
  return jwt.sign(payload, secret, { expiresIn: '1d' });
};

export const verifyToken = (
  token: string,
  secret: string,
): JwtPayload & TokenPayload | null => {
  try {
    const decoded = jwt.verify(token, secret);
    if (typeof decoded === 'string') {
      return null; // in case it's a string instead of an object
    }
    return decoded as JwtPayload & TokenPayload;
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
};
