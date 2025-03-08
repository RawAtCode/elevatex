'use client';

import { useState } from "react";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const VerifyEmailPage = () => {
  const { signUp, isLoaded } = useSignUp();
  const router = useRouter();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!isLoaded) return;

    try {
      await signUp.attemptEmailAddressVerification({ code });
      router.push("/onboarding");
    } catch (err) {
      setError(err.errors[0]?.message || "Verification failed.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">Verify Email</h2>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <form onSubmit={handleVerify} className="space-y-4">
          <Input
            type="text"
            placeholder="Enter verification code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
          <Button type="submit" className="w-full">Verify</Button>
        </form>
      </div>
    </div>
  );
};

export default VerifyEmailPage;
