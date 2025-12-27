import jwt from 'jsonwebtoken';
// Get JWT_SECRET from environment variables
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in the environment variables');
}
// Create Access Token
export const createAccessToken = (userId, email, role) => {
    return jwt.sign({ userId, email, role }, JWT_SECRET, { expiresIn: '1d' });
};
// Create Refresh Token
export const createRefreshToken = (userId, email) => {
    return jwt.sign({ userId, email }, JWT_SECRET, { expiresIn: '7d' });
};
// Verify Access Token
export const verifyAccessToken = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    }
    catch (err) {
        throw new Error('Invalid or expired access token');
    }
};
// Verify Refresh Token
export const verifyRefreshToken = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    }
    catch (err) {
        throw new Error('Invalid or expired refresh token');
    }
};
//# sourceMappingURL=token.js.map