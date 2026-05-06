import { createHash } from "crypto";
import { Request, Response, NextFunction } from "express";
import { PrismaIdempotencyRepository } from "../../repositories/PrismaIdempotencyRepository";

const repository = new PrismaIdempotencyRepository();
const HEADER_NAME = "Idempotency-Key";
const TTL_IN_HOURS = 24;

function addHours(date: Date, hours: number): Date {
    return new Date(date.getTime() + hours * 60 * 60 * 1000);
}

function stableSerialize(value: unknown): string {
    if (value === null || typeof value !== "object") {
        return JSON.stringify(value);
    }

    if (Array.isArray(value)) {
        return `[${value.map(stableSerialize).join(",")}]`;
    }

    const entries = Object.entries(value as Record<string, unknown>)
        .sort(([left], [right]) => left.localeCompare(right))
        .map(([key, nestedValue]) => `${JSON.stringify(key)}:${stableSerialize(nestedValue)}`);

    return `{${entries.join(",")}}`;
}

function createRequestHash(method: string, route: string, body: unknown): string {
    return createHash("sha256")
        .update(method)
        .update(":")
        .update(route)
        .update(":")
        .update(stableSerialize(body))
        .digest("hex");
}

export async function idempotencyMiddleware(req: Request, res: Response, next: NextFunction): Promise<void> {
    const key = req.header(HEADER_NAME)?.trim();

    if (!key) {
        res.status(400).json({
            message: `${HEADER_NAME} e obrigatorio para esta operacao.`
        });
        return;
    }

    const idempotencyKey = key;

    const route = req.originalUrl.split("?")[0];
    const method = req.method.toUpperCase();
    const requestHash = createRequestHash(method, route, req.body ?? {});
    const now = new Date();

    const existingRecord = await repository.findByKey(idempotencyKey, route, method);

    if (existingRecord && existingRecord.expiresAt <= now) {
        await repository.deleteByKey(idempotencyKey, route, method);
    } else if (existingRecord) {
        if (existingRecord.requestHash !== requestHash) {
            res.status(409).json({
                message: "Idempotency-Key ja foi usada com um payload diferente."
            });
            return;
        }

        if (existingRecord.status === "COMPLETED") {
            res.setHeader("Idempotency-Replayed", "true");
            res.status(existingRecord.responseCode ?? 200).json(existingRecord.responseBody);
            return;
        }

        res.status(409).json({
            message: "A requisicao com esta Idempotency-Key ainda esta em processamento."
        });
        return;
    }

    await repository.createPending({
        key: idempotencyKey,
        route,
        method,
        requestHash,
        expiresAt: addHours(now, TTL_IN_HOURS)
    });

    let responseBody: unknown;
    let bodyCaptured = false;

    const originalJson = res.json.bind(res);
    res.json = ((body: unknown) => {
        responseBody = body;
        bodyCaptured = true;
        return originalJson(body);
    }) as Response["json"];

    res.on("finish", () => {
        void finalizeRequest();
    });

    next();

    async function finalizeRequest(): Promise<void> {
        if (res.statusCode >= 500 || !bodyCaptured) {
            await repository.deleteByKey(idempotencyKey, route, method);
            return;
        }

        await repository.markCompleted({
            key: idempotencyKey,
            route,
            method,
            responseCode: res.statusCode,
            responseBody
        });
    }
}
