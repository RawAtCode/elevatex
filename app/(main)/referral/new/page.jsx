import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import ReferralGenerator from "../_components/referral-generator";

export default function NewReferralPage() {
  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col space-y-2">
        <Link href="/referral">
          <Button variant="link" className="gap-2 pl-0">
            <ArrowLeft className="h-4 w-4" />
            Back to Referrals
          </Button>
        </Link>

        <div className="pb-6">
          <h1 className="text-6xl font-bold gradient-title">Referral Message</h1>
          <p className="text-muted-foreground">
            Generate a professional referral for your connection.
          </p>
        </div>
      </div>

      <ReferralGenerator />
    </div>
  );
}
