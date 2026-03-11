import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import 'dotenv/config';

// 1. Pega a URL do arquivo .env
const connectionString = process.env.DATABASE_URL!;

// 2. Cria o pool de conexão do PostgreSQL
const pool = new Pool({ connectionString });

// 3. Cria o adaptador para o Prisma
const adapter = new PrismaPg(pool);

// 4. Exporta o PrismaClient usando o novo adaptador
export const prisma = new PrismaClient({ adapter });