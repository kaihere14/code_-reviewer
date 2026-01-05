import type {Request, Response} from 'express';
import axios from "axios";
import jwt from "jsonwebtoken";
import { prisma } from '../db/connectDb.js';


export const generateToken = (userId: string) => {
    const accessToken = jwt.sign({ userId }, process.env.JWT_SECRET as string, { expiresIn: '7d' });
    return { accessToken };
}


export const googleAuthRedirect = (req: Request, res: Response) => {
    const googleClientId = process.env.GOOGLE_CLIENT_ID;
    const redirectUri = process.env.GOOGLE_CALLBACK_URL;
    console.log("Redirect URI:", redirectUri);
    const scope = [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email'
    ].join(' ');
   const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${googleClientId}&redirect_uri=${redirectUri}&scope=${scope}&access_type=offline&prompt=consent&include_granted_scopes=true`;
    res.redirect(authUrl);
}

export const googleAuthCallback = async(req: Request, res: Response) => {
    const authCode = req.query.code as string;
     try {
            const tokenRes = await axios.post(
    "https://oauth2.googleapis.com/token",
    {
        code: authCode,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: process.env.GOOGLE_CALLBACK_URL,
        grant_type: "authorization_code",
    },
    { headers: { "Content-Type": "application/json" } }
    );

    const { access_token, id_token } = tokenRes.data;

    const userInfoRes = await axios.get(
        "https://www.googleapis.com/oauth2/v2/userinfo",
        { headers: { Authorization: `Bearer ${access_token}` } }
    );

    const userInfo = userInfoRes.data;
    const { user, accessToken, message } = await createOAuthUser(userInfo);
    const redirectUrl = `${process.env.FRONTEND_URL}/oauth-success/verify`;
    res.cookie("accessToken", accessToken, {
        httpOnly: true,
  secure: true,          // REQUIRED on HTTPS
  sameSite: "none",      // REQUIRED for cross-site
  maxAge: 7 * 24 * 60 * 60 * 1000
    });
    res.redirect(redirectUrl);
    } catch (error) {
        res.status(500).json({ message: "Error during Google OAuth callback", error });
    }
}


export const createOAuthUser = async (profile: any) => {
    try {
       let user = await prisma.user.findUnique({ where: { email: profile.email } });
       let message = "";
        if (!user) {
            user = await prisma.user.create({
                data: {
                    name: profile.name,
                    email: profile.email,
                    profileImage: profile.picture,
                    authProvider: "google",
                },
            });
            message = "User created successfully";
        }
        
        const { accessToken } = generateToken(user.id.toString());

        return { user, accessToken, message};
      }
     catch (error: any) {
        console.error("oauth_user_creation_failed", {
            email: profile.email,
            provider: "google",
            error: error.message,
            stack: error.stack,
        });
        throw error;
    }
};

