export type IdempotencyState = "PENDING" | "COMPLETED";

export interface IdempotencyRecord {
    key: string;
    route: string;
    method: string;
    requestHash: string;
    status: IdempotencyState;
    responseCode: number | null;
    responseBody: unknown;
    expiresAt: Date;
}

export interface CreateIdempotencyRequestDTO {
    key: string;
    route: string;
    method: string;
    requestHash: string;
    expiresAt: Date;
}

export interface CompleteIdempotencyRequestDTO {
    key: string;
    route: string;
    method: string;
    responseCode: number;
    responseBody: unknown;
}

export interface IIdempotencyRepository {
    findByKey(key: string, route: string, method: string): Promise<IdempotencyRecord | null>;
    createPending(data: CreateIdempotencyRequestDTO): Promise<void>;
    markCompleted(data: CompleteIdempotencyRequestDTO): Promise<void>;
    deleteByKey(key: string, route: string, method: string): Promise<void>;
}
