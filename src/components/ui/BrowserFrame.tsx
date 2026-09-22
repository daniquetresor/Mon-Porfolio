export default function BrowserFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-bg-elevated">
      <div className="flex items-center gap-1.5 border-b border-border px-4 py-3">
        <span className="size-2.5 rounded-full bg-fg-subtle/40" />
        <span className="size-2.5 rounded-full bg-fg-subtle/40" />
        <span className="size-2.5 rounded-full bg-fg-subtle/40" />
      </div>
      <div className="relative aspect-[16/9] w-full">{children}</div>
    </div>
  );
}
