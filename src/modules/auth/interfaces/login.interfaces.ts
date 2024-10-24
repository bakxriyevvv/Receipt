export declare interface LoginRequest {
    email: string;
    phone: string;
}

export declare interface LoginResponse {
    accessToken: string;
    refreshToken: string;
    message: string;
    photo:string;
    name:string
}