export declare const signupUserService: ({ name, email, password }: any) => Promise<{
    message: string;
    user: {
        id: string;
        name: string;
        email: string;
    };
    token: string;
}>;
export declare const loginUserService: ({ email, password }: any) => Promise<{
    message: string;
    user: {
        id: any;
        name: any;
        email: any;
        role: string;
    };
    token: string;
}>;
export declare const logoutUserService: () => {
    message: string;
};
//# sourceMappingURL=auth.service.d.ts.map