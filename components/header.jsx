import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { ChartNoAxesCombined, ChevronDown, FileTextIcon, GraduationCap, PenBox, Send, StarsIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { checkUser } from "@/lib/checkUser";
// import { ModeToggle } from "@/components/mode-toggle";


const Header = async () => {
    await checkUser();

    return (
        <header className="fixed top-0 w-full border-b bg-background/80 backdrop-blur-md z-50 supports-[backdrop-filter]:bg-background/60">
            <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center space-x-2">
                    <Image
                        src={"/main-logo.png"}
                        alt="Logo"
                        width={200}
                        height={60}
                        className="h-12 py-1 w-auto object-contain mix-blend-screen"
                    />
                    <span className="text-xl font-bold tracking-wide">ElevateX</span>
                </Link>

                <div className="flex items-center space-x-2 md:space-x-4">
                    <SignedIn>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button>
                                    <StarsIcon className="h-4 w-4" />
                                    <span className="hidden md:block">Features</span>
                                    <ChevronDown className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem>
                                    <Link href={"/dashboard"} className="flex items-center gap-2">
                                        <ChartNoAxesCombined className="h-4 w-4" />
                                        <span>Trending Insights</span>
                                    </Link>
                                </DropdownMenuItem>

                                <DropdownMenuItem>
                                    <Link href={"/interview"} className="flex items-center gap-2">
                                        <GraduationCap className="h-4 w-4" />
                                        <span>Interview Prep</span>
                                    </Link>
                                </DropdownMenuItem>

                                <DropdownMenuItem>
                                    <Link href={"/resume"} className="flex items-center gap-2">
                                        <FileTextIcon className="h-4 w-4" />
                                        <span>Build Resume</span>
                                    </Link>
                                </DropdownMenuItem>

                                <DropdownMenuItem>
                                    <Link href={"/cover-letter"} className="flex items-center gap-2">
                                        <PenBox className="h-4 w-4" />
                                        <span>Cover Letter</span>
                                    </Link>
                                </DropdownMenuItem>

                                <DropdownMenuItem>
                                    <Link href={"/referral"} className="flex items-center gap-2">
                                        <Send className="h-4 w-4" />
                                        <span>Referrals</span>
                                    </Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SignedIn>


                    <SignedOut>
                        <SignInButton>
                            <Button variant="outline">Sign In</Button>
                        </SignInButton>
                    </SignedOut>


                    <SignedIn>
                        <UserButton appearance={{
                            elements: {
                                avatarBox: "w-10 h-10",
                                userButtonPopoverCard: "shadow-x1",
                                userPreviewMainIdentifier: "font-semibold",
                            },
                        }}
                            afterSignOutUrl="/"
                        />
                    </SignedIn>

                    {/* <ModeToggle /> */}
                </div>
            </nav>

        </header>
    )
}

export default Header