import { prisma } from "../infrastructure/database/prisma";

export class Logger{

    private static generateId(): string {
        return Date.now().toString() + Math.random().toString(36).substring(2,6);
    }

    static async info(message: string, route?: string){
        await prisma.log.create({
            data:{
                id: this.generateId(),
                level: "INFO",
                message,
                route
            }
        });
    }

    static async warn(message: string) {
        await prisma.log.create({
            data: {
                id: this.generateId(),
                level: "WARN",
                message,
            }
        });
    }

    static async error(error: any, route?: string) {
        await prisma.log.create({
            data: {
                id: this.generateId(),
                level: "ERROR",
                message: error.message,
                stack: error.stack,
                route
            }
        });
    }
}