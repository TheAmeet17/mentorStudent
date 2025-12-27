import jwt from 'jsonwebtoken';
export declare const createAccessToken: (userId: string | number, email: string, role: string) => string;
export declare const createRefreshToken: (userId: number, email: string) => string;
export declare const verifyAccessToken: (token: string) => string | jwt.JwtPayload;
export declare const verifyRefreshToken: (token: string) => string | jwt.JwtPayload;
//# sourceMappingURL=token.d.ts.map