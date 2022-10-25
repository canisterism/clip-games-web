import { auth } from "@/prisma/firebaseAdmin";
import { UserRecord } from "firebase-admin/lib/auth/user-record";

const getUserFromToken = async (
  token: string
): Promise<UserRecord | undefined> => {
  // TODO: バックエンドのFirebase clientのディレクトリをいい感じにする
  try {
    const decodedIdToken = await auth.verifyIdToken(token, true);
    return await auth.getUser(decodedIdToken.uid);
  } catch (error) {
    // TODO: エラーハンドリング
    //   - user not found
    //   - token expired
    console.error(error);
    return undefined;
  }
};

export default getUserFromToken;
