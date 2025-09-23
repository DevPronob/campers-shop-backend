import { JwtPayload } from 'jsonwebtoken';
import { generateToken } from './jwt';
import config from '../config';


export const useToken = (payload: JwtPayload) => {
  const userData: JwtPayload = {
    _id: payload._id,
    name: payload.name,
    email: payload.email,
    role: payload.role,
  };
  console.log(userData,"userData")
  const accessToken = generateToken(
    userData as any,
    config.jwt_secret as string,
  );
  const refreshToken = generateToken(
    userData as any,
    config.jwt_secret as string,
  );

  return {
    accessToken,
    refreshToken: refreshToken,
  };
};
