import { PrismaClient } from "@prisma/client";
import { UserRecord } from "firebase-admin/lib/auth/user-record";
export type ContextType = {
  prisma: PrismaClient;
  user?: UserRecord;
};
