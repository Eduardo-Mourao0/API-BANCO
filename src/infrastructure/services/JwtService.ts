import * as jwt from "jsonwebtoken";
import { IJwtService, JwtPayload } from "../../domain/services/IJwtService";

const EXPIRES_IN = "1d";

function getJwtSecret(): string {
    const secret = process.env.JWT_SECRET?.trim();

    if (!secret) {
        throw new Error("JWT_SECRET nao configurado.");
    }

    return secret;
}

export class JwtService implements IJwtService {
    private readonly secret: string;

    constructor(secret: string = getJwtSecret()) {
        this.secret = secret;
    }

    sign(payload: JwtPayload): string {
        return jwt.sign(payload, this.secret, { expiresIn: EXPIRES_IN });
    }

    verify(token: string): JwtPayload {
        return jwt.verify(token, this.secret) as JwtPayload;
    }
}
