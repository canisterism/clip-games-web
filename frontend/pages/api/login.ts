import { initAuth } from "@/config/firebase";
import { NextApiRequest, NextApiResponse } from "next";
import { setAuthCookies } from "next-firebase-auth";

initAuth();

// Firebase Authでの認証後、得たトークンをCookieに保存するためのエンドポイント
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = req.body.token;
  try {
    await setAuthCookies(req, res, { token });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Unexpected error." });
  }
  return res.status(200).json({ status: true });
}
