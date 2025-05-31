export type UserLoginType = {
    refresh: string;
    access: string;
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
}

export type UserRegister = {
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    password: string;
}