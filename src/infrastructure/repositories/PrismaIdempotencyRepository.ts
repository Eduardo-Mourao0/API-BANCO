import { Prisma } from "@prisma/client";
import { prisma } from "../database/prisma";
import {
    CompleteIdempotencyRequestDTO,
    CreateIdempotencyRequestDTO,
    IIdempotencyRepository,
    IdempotencyRecord
} from "../../domain/repositories/IIdempotencyRepository";

export class PrismaIdempotencyRepository implements IIdempotencyRepository {
    private toPrismaJson(value: unknown): Prisma.InputJsonValue | typeof Prisma.JsonNull {
        if (value === null) {
            return Prisma.JsonNull;
        }

        return JSON.parse(JSON.stringify(value)) as Prisma.InputJsonValue;
    }

    async findByKey(
        key: string,
        route: string,
        method: string
    ): Promise<IdempotencyRecord | null> {
        const record = await prisma.idempotencyRequest.findUnique({
            where: {
                key_route_method: {
                    key,
                    route,
                    method
                }
            }
        });

        if (!record) {
            return null;
        }

        return {
            key: record.key,
            route: record.route,
            method: record.method,
            requestHash: record.requestHash,
            status: record.status,
            responseCode: record.responseCode,
            responseBody: record.responseBody,
            expiresAt: record.expiresAt
        };
    }

    async createPending(data: CreateIdempotencyRequestDTO): Promise<void> {
        await prisma.idempotencyRequest.create({
            data: {
                key: data.key,
                route: data.route,
                method: data.method,
                requestHash: data.requestHash,
                expiresAt: data.expiresAt
            }
        });
    }

    async markCompleted(data: CompleteIdempotencyRequestDTO): Promise<void> {
        await prisma.idempotencyRequest.update({
            where: {
                key_route_method: {
                    key: data.key,
                    route: data.route,
                    method: data.method
                }
            },
            data: {
                status: "COMPLETED",
                responseCode: data.responseCode,
                responseBody: this.toPrismaJson(data.responseBody)
            }
        });
    }

    async deleteByKey(key: string, route: string, method: string): Promise<void> {
        await prisma.idempotencyRequest.deleteMany({
            where: {
                key,
                route,
                method
            }
        });
    }
}
