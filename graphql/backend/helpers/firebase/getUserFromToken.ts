import { auth } from "@/prisma/firebaseAdmin";
import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";

const getUserFromToken = async (
  token: string
): Promise<DecodedIdToken | undefined> => {
  // TODO: バックエンドのFirebase clientのディレクトリをいい感じにする
  try {
    const decodedIdToken = await auth.verifyIdToken(token, true);
    return decodedIdToken;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default getUserFromToken;
