'use client';

import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export const Spinner = ({ className }: { className?: string }) => {
  return (
    <Loader2 className={cn("h-8 w-8 animate-spin text-primary", className)} />
  );
};

export const FullPageSpinner = () => {
    return (
        <div className="flex items-center justify-center h-screen w-screen fixed top-0 left-0 bg-background z-50">
            <Spinner />
        </div>
    )
} 