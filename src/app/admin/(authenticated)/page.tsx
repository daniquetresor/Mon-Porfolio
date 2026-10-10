import Link from "next/link";
import { FolderKanban, MessageSquareQuote, ExternalLink } from "lucide-react";
import { projects } from "@/data/projects";
import { testimonials } from "@/data/testimonials";
import pendingData from "@/data/testimonials-pending.json";
import type { TestimonialSubmission } from "@/types";

export default function AdminDashboardPage() {
  const pending = pendingData as TestimonialSubmission[];

  return (
    <div>
      <h1 className="font-display text-3xl font-medium text-fg">Tableau de bord</h1>
      <p className="mt-2 text-fg-muted">Gère le contenu de ton portfolio depuis cet espace.</p>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Link
          href="/admin/projects"
          className="group flex items-center justify-between rounded-2xl border border-border p-6 transition-colors hover:border-accent"
        >
          <div className="flex items-center gap-4">
            <span className="flex size-12 items-center justify-center rounded-full border border-border text-accent">
              <FolderKanban className="size-5" />
            </span>
            <div>
              <p className="text-lg font-medium text-fg">Projets</p>
              <p className="text-sm text-fg-muted">{projects.length} projet(s) publié(s)</p>
            </div>
          </div>
        </Link>

        <Link
          href="/admin/testimonials"
          className="group flex items-center justify-between rounded-2xl border border-border p-6 transition-colors hover:border-accent"
        >
          <div className="flex items-center gap-4">
            <span className="relative flex size-12 items-center justify-center rounded-full border border-border text-accent">
              <MessageSquareQuote className="size-5" />
              {pending.length > 0 && (
                <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-accent text-[10px] font-medium text-bg">
                  {pending.length}
                </span>
              )}
            </span>
            <div>
              <p className="text-lg font-medium text-fg">Témoignages</p>
              <p className="text-sm text-fg-muted">
                {pending.length} en attente · {testimonials.length} publié(s)
              </p>
            </div>
          </div>
        </Link>
      </div>

      <a
        href="/"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-10 inline-flex items-center gap-2 text-sm text-fg-muted transition-colors hover:text-accent"
      >
        Voir le site public
        <ExternalLink className="size-3.5" />
      </a>
    </div>
  );
}
