import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { ChartNoAxesCombined, FileTextIcon, GraduationCap, PenBox, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuContent,
    NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { checkUser } from "@/lib/checkUser";

const Header = async () => {
    const userId = await checkUser();

    return (
        <header className="fixed top-0 w-full border-b bg-background/80 backdrop-blur-md z-50 supports-[backdrop-filter]:bg-background/60">
            <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
                
                {/* LOGO */}
                <Link href={userId ? "/dashboard" : "/"} className="flex items-center space-x-2">
                    <Image
                        src={"/main-logo.png"}
                        alt="Logo"
                        width={200}
                        height={60}
                        className="h-12 py-1 w-auto object-contain mix-blend-screen"
                    />
                    <span className="text-xl font-bold tracking-wide">ElevateX</span>
                </Link>

                {/* NAVIGATION & PROFILE */}
                <div className="flex items-center space-x-6">
                    <SignedIn>
                        <NavigationMenu>
                            <NavigationMenuList>
                                <NavigationMenuItem>
                                    <NavigationMenuTrigger className="px-4 py-2 text-sm font-medium">
                                        Features
                                    </NavigationMenuTrigger>
                                    <NavigationMenuContent className="w-56 p-2 bg-background shadow-md rounded-md">
                                        <ul className="space-y-1">
                                            {[
                                                { href: "/dashboard", icon: ChartNoAxesCombined, label: "Trending Insights" },
                                                { href: "/interview", icon: GraduationCap, label: "Interview Prep" },
                                                { href: "/resume", icon: FileTextIcon, label: "Build Resume" },
                                                { href: "/ai-cover-letter", icon: PenBox, label: "Cover Letter" },
                                                { href: "/referral", icon: Send, label: "Job Referrals" },
                                            ].map(({ href, icon: Icon, label }) => (
                                                <li key={href}>
                                                    <Link href={href} passHref legacyBehavior>
                                                        <NavigationMenuLink className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-gray-100 transition text-muted-foreground">
                                                            <Icon className="h-5 w-5 text-gray-500" />
                                                            <span className="font-medium">{label}</span>
                                                        </NavigationMenuLink>
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>
                            </NavigationMenuList>
                        </NavigationMenu>
                    </SignedIn>

                    {/* AUTH BUTTONS */}
                    <SignedOut>
                        <SignInButton>
                            <Button variant="outline">Sign In</Button>
                        </SignInButton>
                    </SignedOut>

                    <SignedIn>
                        <UserButton 
                            appearance={{
                                elements: {
                                    avatarBox: "w-10 h-10",
                                    userButtonPopoverCard: "shadow-xl",
                                    userPreviewMainIdentifier: "font-semibold",
                                },
                            }}
                            fallbackRedirectUrl="/"
                        />
                    </SignedIn>
                </div>
            </nav>
        </header>
    );
};

export default Header;
