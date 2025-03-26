// import { SignIn } from "@clerk/nextjs"

// const Page = () => {
//   return (
//     <SignIn />
//   )
// }

// export default Page



'use client';

import { useState } from "react";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";

const SignInPage = () => {
  const { signIn, isLoaded } = useSignIn();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!isLoaded) return;

    try {
      const result = await signIn.create({
        identifier: email,
        password,
      });

      if (result.status === "complete") {
        router.push("/onboarding");
      }
    } catch (err) {
      setError(err.errors[0]?.message || "Invalid credentials. Try again.");
    }
  };

  const handleGoogleSignIn = async () => {
    if (!isLoaded) return;
    await signIn.authenticateWithRedirect({
      strategy: "oauth_google",
      redirectUrl: "/onboarding",
    });
  };

  return (
    <div className="flex flex-col items-center justify-center border-primary">
      <div className="bg-background border-2 p-8 rounded-lg shadow-md w-full max-w-md text-center">
        <h1 className="text-muted-foreground mb-6">Sign In to ElevateX</h1>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <Button onClick={handleGoogleSignIn} className="w-full flex items-center gap-2 mb-4 bg-gray-100">
          <FcGoogle size={20} /> Continue with Google
        </Button>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative text-muted-foreground text-sm bg-background px-2">OR</div>
        </div>

        <form onSubmit={handleSignIn} className="space-y-4">
          <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <Button type="submit" className="w-full">Sign In</Button>
        </form>

        <p className="text-sm text-gray-500 mt-4">
          Don't have an account? <Link href="/sign-up" className="text-muted-foreground hover:underline">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default SignInPage;