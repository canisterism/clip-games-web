import { clientInitializedAuth } from "@/frontend/config/firebase";
import { signOut as firebaseSignOut } from "firebase/auth";
export { signInWithGoogle } from "./google";

export const signOut = async () => {
  await firebaseSignOut(clientInitializedAuth);
};
