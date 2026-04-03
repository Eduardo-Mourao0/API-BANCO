import * as bcrypt from "bcrypt";
import { IPasswordHasher } from "../../domain/services/IPasswordHasher";

export class BcryptPasswordHasher implements IPasswordHasher {
    async hash(password: string): Promise<string> {
        return bcrypt.hash(password, 10);
    }
}