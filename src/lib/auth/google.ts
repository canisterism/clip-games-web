import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { clientInitializedAuth } from "../../config/firebase";

const provider = new GoogleAuthProvider();
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(clientInitializedAuth, provider);

    if (!result) {
      throw Error("Google Auth has succeeded, but result is null.");
    }

    // This gives you a Google Access Token. You can use it to access Google APIs.
    const credential = GoogleAuthProvider.credentialFromResult(result);

    if (!credential) {
      throw Error("Google Auth has succeeded, but credential is null.");
    }

    // MEMO: userの情報はauthContextで管理している
  } catch (error) {
    console.error(error);
  }
};
