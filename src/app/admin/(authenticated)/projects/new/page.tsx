import ProjectForm from "@/components/admin/ProjectForm";

export default function NewProjectPage() {
  return (
    <div>
      <h1 className="font-display text-3xl font-medium text-fg">Ajouter un projet</h1>
      <p className="mt-2 text-fg-muted">Le projet sera publié sur le site après quelques instants (redéploiement automatique).</p>
      <div className="mt-8">
        <ProjectForm />
      </div>
    </div>
  );
}
