export type ProjectService = {
  title: string;
  slug: string;
};

export function getProjectServices(project: { servicii?: unknown[] | null }): ProjectService[] {
  return (project.servicii || []).flatMap((service) => {
    if (!service || typeof service !== "object" || !("titlu" in service)) return [];
    const title = typeof service.titlu === "string" ? service.titlu : "";
    const slug = "slug" in service && typeof service.slug === "string" ? service.slug : "";
    return title && slug ? [{ title, slug }] : [];
  });
}

export function getPrimaryService(project: { servicii?: unknown[] | null }) {
  return getProjectServices(project)[0] || null;
}
