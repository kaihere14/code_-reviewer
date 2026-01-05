import "dotenv/config";
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from "../../generated/prisma/client.js";
declare const prisma: PrismaClient<{
    adapter: PrismaPg;
}, never, import("../../generated/prisma/runtime/client.js").DefaultArgs>;
declare const connectDB: () => Promise<void>;
export { prisma, connectDB };
//# sourceMappingURL=connectDb.d.ts.map