import AdminNav from "@/components/admin/AdminNav";

export default function AuthenticatedAdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AdminNav />
      <main className="mx-auto max-w-5xl px-6 py-10">{children}</main>
    </>
  );
}
