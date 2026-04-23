import * as jwt from "jsonwebtoken";
import { IJwtService, JwtPayload } from "../../domain/services/IJwtService";

const SECRET = process.env.JWT_SECRET ?? "changeme";
const EXPIRES_IN = "1d";

export class JwtService implements IJwtService {
    sign(payload: JwtPayload): string {
        return jwt.sign(payload, SECRET, { expiresIn: EXPIRES_IN });
    }

    verify(token: string): JwtPayload {
        return jwt.verify(token, SECRET) as JwtPayload;
    }
}