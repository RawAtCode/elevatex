-- CreateTable
CREATE TABLE "Referral" (
    "id" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "referrer" TEXT NOT NULL,
    "jobTitle" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Referral_pkey" PRIMARY KEY ("id")
);
