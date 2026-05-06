-- CreateEnum
DO $$
BEGIN
    CREATE TYPE "IdempotencyStatus" AS ENUM ('PENDING', 'COMPLETED');
EXCEPTION
    WHEN duplicate_object THEN NULL;
END $$;

-- CreateTable
CREATE TABLE IF NOT EXISTS "IdempotencyRequest" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "route" TEXT NOT NULL,
    "method" TEXT NOT NULL,
    "requestHash" TEXT NOT NULL,
    "status" "IdempotencyStatus" NOT NULL DEFAULT 'PENDING',
    "responseCode" INTEGER,
    "responseBody" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "IdempotencyRequest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "IdempotencyRequest_key_route_method_key"
ON "IdempotencyRequest"("key", "route", "method");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "IdempotencyRequest_expiresAt_idx"
ON "IdempotencyRequest"("expiresAt");
