import { initAuth } from "@/config/firebase";
import { NextApiRequest, NextApiResponse } from "next";
import { unsetAuthCookies } from "next-firebase-auth";

initAuth();

// ログアウト用のエンドポイント
// cookieに保存したJWTを削除する
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await unsetAuthCookies(req, res);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Unexpected error." });
  }
  return res.status(200).json({ status: true });
}
