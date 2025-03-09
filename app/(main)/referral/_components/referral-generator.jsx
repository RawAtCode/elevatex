"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { generateReferral } from "@/actions/referral";
import useFetch from "@/hooks/use-fetch";
import { referralSchema } from "@/app/lib/schema";

export default function ReferralGenerator() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(referralSchema),
  });

  const {
    loading: generating,
    fn: generateReferralFn,
    data: generatedReferral,
  } = useFetch(generateReferral);

  useEffect(() => {
    if (generatedReferral) {
      toast.success("Referral message generated successfully!");
      router.push(`/referral/${generatedReferral.id}`);
      reset();
    }
  }, [generatedReferral]);

  const onSubmit = async (data) => {
    try {
      await generateReferralFn(data);
    } catch (error) {
      toast.error(error.message || "Failed to generate referral message");
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Referral Request</CardTitle>
          <CardDescription>
            Enter details for the referral request.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="referrerName">Referrer Name</Label>
              <Input
                id="referrerName"
                placeholder="Enter the referrer's name"
                {...register("referrerName")}
              />
              {errors.referrerName && (
                <p className="text-sm text-red-500">{errors.referrerName.message}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  placeholder="Enter company name"
                  {...register("companyName")}
                />
                {errors.companyName && (
                  <p className="text-sm text-red-500">{errors.companyName.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="jobTitle">Job Title</Label>
                <Input
                  id="jobTitle"
                  placeholder="Enter job title"
                  {...register("jobTitle")}
                />
                {errors.jobTitle && (
                  <p className="text-sm text-red-500">{errors.jobTitle.message}</p>
                )}
              </div>
            </div>

            <div className="flex justify-end">
              <Button type="submit" disabled={generating}>
                {generating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  "Generate Referral Message"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
