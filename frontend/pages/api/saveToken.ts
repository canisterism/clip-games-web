import cookie from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

// Firebase Authでの認証後、得たトークンをCookieに保存するためのエンドポイント
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("/api/saveToken called");
  if (req.method !== "POST") {
    return res.status(405).end(); // Method Not Allowed
  }

  const { token } = req.body;

  // Validation (optional but recommended)
  if (!token || typeof token !== "string") {
    return res.status(400).json({ error: "Bad Request" }); // Bad Request
  }

  // Set HttpOnly cookie
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("auth", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development", // Use HTTPS in production
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    })
  );
  console.log("cookie set");
  console.log({ res });

  res.status(200).json({ status: "Success" });
}
