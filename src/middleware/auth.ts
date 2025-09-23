import { Request, Response } from "express";
import AppError from "../errors/AppError";
import config from "../config";
import { User } from "../modules/user/user.model";
import { JwtPayload } from 'jsonwebtoken';
import { verifyToken } from "../utilitis/jwt";
 export const auth =(...userRoles: string[]) => {
    return async(req: Request, res: Response, next: Function) => {
       try {
      // Ensure cookies are parsed using cookie-parser middleware
      const token = req.cookies?.accessToken;
      console.log(token, 'token from middleware');

      if (!token) {
        throw new AppError(401, 'You do not have a token to access this route');
      }

      const verifiedToken = verifyToken(token, config.jwt_secret as string) as JwtPayload;

      if (!verifiedToken?.email) {
        throw new AppError(401, 'Token is invalid or missing email');
      }

      const user = await User.findOne({ email: verifiedToken.email });
      if (!user) {
        throw new AppError(404, 'User does not exist');
      }


      if (!userRoles.includes(user.role as unknown as string)) {
        throw new AppError(
          500,
          'You are not allowed to access this route'
        );
      }

      req.user = user;
      next();
    } catch (error) {
      console.log('jwt error', error);
      next(error);
    }
    }
}