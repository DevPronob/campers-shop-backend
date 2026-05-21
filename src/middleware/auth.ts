import { Request, Response, NextFunction } from "express";
import AppError from "../errors/AppError";
import { User } from "../modules/user/user.model";
import { verifyToken } from "../utilitis/jwt";

export const auth = (...userRoles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.cookies?.accessToken;

      if (!token) {
        throw new AppError(401, "You do not have a token to access this route");
      }

      const verifiedToken = verifyToken(token, "shhhhh");

      if (!verifiedToken?.email) {
        throw new AppError(401, "Token is invalid or missing email");
      }

      const user = await User.findOne({ email: verifiedToken.email });
      if (!user) {
        throw new AppError(404, "User does not exist");
      }

      if (!userRoles.includes(user.role as string)) {
        throw new AppError(403, "You are not allowed to access this route");
      }

      req.user = user;
      next();
    } catch (error) {
      next(error);
    }
  };
};