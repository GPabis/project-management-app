export interface IUserData {
    username: string;
    email: string;
    _id: string;
}

export interface IAuthContext {
    username: string | null;
    email: string | null;
    token: string | null;
    _id: string | null;
    isLoggedIn: boolean;
    login: (token: string, username: string, email: string) => void;
    setUsernameHandler: (username: string) => void;
    setEmailHandler: (email: string) => void;
    logout: () => void;
}
