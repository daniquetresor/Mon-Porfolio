"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { LayoutDashboard, FolderKanban, MessageSquareQuote, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/admin", label: "Tableau de bord", icon: LayoutDashboard, exact: true },
  { href: "/admin/projects", label: "Projets", icon: FolderKanban, exact: false },
  { href: "/admin/testimonials", label: "Témoignages", icon: MessageSquareQuote, exact: false },
];

export default function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    setLoggingOut(true);
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <header className="border-b border-border">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/admin" className="font-display text-lg font-medium text-fg">
          Admin — T. Ossohou
        </Link>
        <nav className="flex items-center gap-1">
          {LINKS.map((link) => {
            const active = link.exact ? pathname === link.href : pathname.startsWith(link.href);
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm transition-colors",
                  active ? "bg-fg text-bg" : "text-fg-muted hover:text-fg"
                )}
              >
                <Icon className="size-4" />
                {link.label}
              </Link>
            );
          })}
          <button
            type="button"
            onClick={handleLogout}
            disabled={loggingOut}
            className="ml-2 inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm text-fg-muted transition-colors hover:border-accent hover:text-accent disabled:opacity-60"
          >
            <LogOut className="size-4" />
            Déconnexion
          </button>
        </nav>
      </div>
    </header>
  );
}
