"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

export default function PageTransition() {
  const pathname = usePathname();
  const [prevPath, setPrevPath] = useState(pathname);
  const [show, setShow] = useState(false);

  if (pathname !== prevPath) {
    setPrevPath(pathname);
    setShow(true);
  }

  useEffect(() => {
    if (!show) return;
    const timer = setTimeout(() => setShow(false), 750);
    return () => clearTimeout(timer);
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          aria-hidden="true"
          initial={{ x: "-130%" }}
          animate={{ x: "130%" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
          className="pointer-events-none fixed inset-0 z-[100] -skew-x-12"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, transparent 35%, color-mix(in srgb, var(--color-accent) 20%, transparent) 48%, color-mix(in srgb, var(--color-fg) 10%, transparent) 50%, color-mix(in srgb, var(--color-accent) 20%, transparent) 52%, transparent 65%, transparent 100%)",
          }}
        />
      )}
    </AnimatePresence>
  );
}
