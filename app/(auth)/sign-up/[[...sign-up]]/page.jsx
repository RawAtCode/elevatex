// import { SignUp } from "@clerk/nextjs"

// const Page = () => {
//   return (
//     <SignUp />
//   )
// }

// export default Page



'use client';

import { useState } from "react";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";

const SignUpPage = () => {
  const { signUp, isLoaded } = useSignUp();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!isLoaded) return;

    try {
      await signUp.create({
        emailAddress: email,
        password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      router.push("/auth/verify-email");
    } catch (err) {
      setError(err.errors[0]?.message || "Signup failed. Try again.");
    }
  };

  const handleGoogleSignUp = async () => {
    if (!isLoaded) return;
    await signUp.authenticateWithRedirect({
      strategy: "oauth_google",
      redirectUrl: "/onboarding",
    });
  };

  return (
    <div className="flex flex-col items-center justify-center border-primary">
      <div className="bg-background border-2 p-8 rounded-lg shadow-md w-full max-w-md text-center">
        <p className="text-muted-foreground mb-6">Sign Up to ElevateX</p>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <Button onClick={handleGoogleSignUp} className="w-full flex items-center gap-2 mb-4 bg-gray-100 text-black">
          <FcGoogle size={20} /> Continue with Google
        </Button>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative text-muted-foreground text-sm bg-background px-2">OR</div>
        </div>

        <form onSubmit={handleSignUp} className="space-y-4">
          <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <Button type="submit" className="w-full">Sign Up</Button>
        </form>

        <p className="text-sm text-gray-500 mt-4">
          Already have an account? <Link href="/sign-in" className="text-muted-foreground hover:underline">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
