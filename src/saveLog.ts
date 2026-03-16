import { prisma } from "./prisma";

export async function saveLog(error: any, route?: string) {
    await prisma.log.create({
        data: {
            level: "Error",
            message: error.message,
            stack: error.stack,
            route: route
        }
    });
}