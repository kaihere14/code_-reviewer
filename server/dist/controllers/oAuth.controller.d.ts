import type { Request, Response } from 'express';
export declare const generateToken: (userId: string) => {
    accessToken: string;
};
export declare const googleAuthRedirect: (req: Request, res: Response) => void;
export declare const googleAuthCallback: (req: Request, res: Response) => Promise<void>;
export declare const createOAuthUser: (profile: any) => Promise<{
    user: {
        id: string;
        email: string;
        name: string | null;
        authProvider: string;
        profileImage: string | null;
        admin: boolean;
        createdAt: Date;
        updatedAt: Date;
    };
    accessToken: string;
    message: string;
}>;
//# sourceMappingURL=oAuth.controller.d.ts.map