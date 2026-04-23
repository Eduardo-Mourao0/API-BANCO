import { Prisma, PrismaClient } from "@prisma/client";

import { ITransactionManager,PrismaTransactionClient, TransactionCallback, TransactionManagerConfig } from "../../domain/managers/ITransactionManager";
import { prisma } from "../database/prisma";

const DEFAULT_CONFIG: Required<TransactionManagerConfig> = {
    timeout: 30000,
    isolationLevel: Prisma.TransactionIsolationLevel.ReadCommitted
};

export class PrismaTransactionManager implements ITransactionManager {
    constructor(
        private readonly transactionClient: PrismaClient = prisma,
        private readonly config: TransactionManagerConfig = DEFAULT_CONFIG
    ) {}

    async execute<T>(
        action: TransactionCallback<T>,
        timeout?: number
    ): Promise<T> {
        const result = await this.transactionClient.$transaction((tx) => action(tx as PrismaTransactionClient),
            {
                ...this.config,
                timeout: timeout ?? this.config.timeout
            }
        );

        return result;
    }
}
