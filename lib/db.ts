import { PrismaClient } from "@prisma/client";
import { PrismaLibSQL } from "@prisma/adapter-libsql";
import { createClient } from "@libsql/client";

const dbUrl = process.env.TURSO_DATABASE_URL;
const token = process.env.TURSO_AUTH_TOKEN;

if (!dbUrl || !token) throw new Error("Missing Credentials");

const libsql = createClient({
	url: dbUrl,
	authToken: token,
});

const adapter = new PrismaLibSQL(libsql);

const prismaClientSingleton = () => {
	return new PrismaClient({ adapter });
};

declare global {
	var prismaGlobal: ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
