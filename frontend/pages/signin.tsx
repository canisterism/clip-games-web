import { signInWithGoogle, signOut } from "../lib/auth";

const SignIn = () => {
  return (
    <div className="w-full h-full flex m-8 gap-4">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => signInWithGoogle()}
      >
        Sign In
      </button>
      <button
        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        onClick={() => signOut()}
      >
        Sign Out
      </button>
    </div>
  );
};

export default SignIn;
