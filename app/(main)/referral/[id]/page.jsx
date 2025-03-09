import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getReferral } from "@/actions/referral";
import ReferralPreview from "../_components/referral-preview";

export default async function ReferralDetailsPage({ params }) {
  const { id } = params;
  const referral = await getReferral(id);

  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col space-y-2">
        <Link href="/referral">
          <Button variant="link" className="gap-2 pl-0">
            <ArrowLeft className="h-4 w-4" />
            Back to Referrals
          </Button>
        </Link>

        <h1 className="text-3xl font-bold gradient-title mb-6">
          Referral for {referral?.jobRole} at {referral?.company}
        </h1>
      </div>

      <ReferralPreview message={referral?.message} />
    </div>
  );
}
