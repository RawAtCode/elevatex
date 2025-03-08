"use client";

import { LoaderPinwheel } from "lucide-react"; // ShadCN loader icon
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const Loader = () => {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 500); // Show for 500ms
    return () => clearTimeout(timeout);
  }, [pathname]); // Runs on route change

  if (!loading) return null; // Hide when not loading

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <LoaderPinwheel className="h-12 w-12 text-white animate-spin" />
    </div>
  );
};

export default Loader;
