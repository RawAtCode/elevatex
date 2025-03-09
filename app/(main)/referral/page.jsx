import { getReferrals } from "@/actions/referral";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import ReferralList from "./_components/referral-list";

export default async function ReferralPage() {
  const referrals = await getReferrals();

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-2 items-center justify-between mb-5">
        <h1 className="text-6xl font-bold gradient-title">My Referrals</h1>
        <Link href="/referral/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create New
          </Button>
        </Link>
      </div>

      <ReferralList referrals={referrals} />
    </div>
  );
}
