export const seo = (title: string, description: string) => ({
  meta: [
    { title: `${title} · Giga Group` },
    { name: "description", content: description },
    { property: "og:title", content: `${title} · Giga Group` },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ],
});
