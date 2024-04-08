"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence } from "framer-motion";

export default function LandingPage() {
  const router = useRouter();

  useEffect(() => {
    router.push("/login");
  }, []);
}
