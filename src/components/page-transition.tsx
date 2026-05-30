"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Loader2 } from "lucide-react";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsPending(true);
    const timeout = setTimeout(() => {
      setIsPending(false);
    }, 800);

    return () => clearTimeout(timeout);
  }, [pathname]);

  if (isPending) {
    return (
      <div className="flex pt-[45vh] w-full flex-col items-center justify-start">
        <Loader2 className="size-8 animate-spin text-primary" />
        <p className="mt-4 text-sm font-medium text-muted-foreground animate-pulse">
          Loading content...
        </p>
      </div>
    );
  }

  return <div>{children}</div>;
}
