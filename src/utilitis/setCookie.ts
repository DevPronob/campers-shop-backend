import { Response } from "express";

interface ITokenInfo {
    accessToken: string;
    refreshToken: string;
}
export const setAuthCookie =(res:Response,tokenInfo:ITokenInfo) =>{
    const option ={
        httpOnly: true,
    secure: true,
    sameSite: "none" as const,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    }
    if(tokenInfo.accessToken){
        res.cookie("accessToken",tokenInfo.accessToken,option)
    }
    if(tokenInfo.refreshToken){
        res.cookie("refreshToken",tokenInfo.refreshToken,option)
    }
    
}