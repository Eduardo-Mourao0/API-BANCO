export interface IJwtService {
    sign(payload: JwtPayload): string;
    verify(token: string): JwtPayload;
}

export interface JwtPayload {
    userId: string;
    role?: string;
}