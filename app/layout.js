import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/theme-provider";
import Header from "../components/header";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Toaster } from "sonner";
import { Github, Twitter } from "lucide-react";
import Link from "next/link";
import Loader from "@/components/ui/loader";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ElevateX",
  description: "Developed by @RawAtCode.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider appearance={{
      baseTheme: dark,
    }}>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${inter.className}`}
        >
          <Loader />
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
          >
            {/* header */}
            <Header />

            <main className="min-h-screen">
              {children}
            </main>

            <Toaster richColors />

            {/* footer */}
            <footer className="bg-background border-t py-6">
              <div className="container mx-auto px-4 text-center text-muted-foreground">
                <p>
                  Developed by{" "}
                  <Link
                    href="https://github.com/RawAtCode"
                    target="_blank"
                    className="font-semibold hover:text-primary transition"
                  >
                    RawAtCode
                  </Link>
                </p>
              </div>
            </footer>

          </ThemeProvider>

        </body>
      </html>
    </ClerkProvider>
  );
}
