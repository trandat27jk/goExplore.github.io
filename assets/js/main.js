document.addEventListener("DOMContentLoaded", async () => {
  const sections = [
    { id: "navigation", file: "sections/navigation.html" },
    { id: "hero", file: "sections/hero.html" },
    { id: "why-choose-us", file: "sections/why-choose-us.html" },
    { id: "trending-destinations", file: "sections/trending-destinations.html" },
    { id: "find-popular-tours", file: "sections/find-popular-tours.html" },
    { id: "popular-things-to-do", file: "sections/popular-things-to-do.html" },
    { id: "customer-reviews", file: "sections/customer-reviews.html" },
    { id: "travel-articles", file: "sections/travel-articles.html" },
    { id: "footer", file: "sections/footer.html" }
  ];

  for (const section of sections) {
    try {
      const res = await fetch(section.file);
      if (!res.ok) throw new Error(`Failed to load ${section.file}: ${res.statusText}`);

      const html = await res.text();
      const container = document.getElementById(section.id);
      if (container) {
        container.innerHTML = html;
      } else {
        console.warn(`Element with id="${section.id}" not found in DOM.`);
      }
    } catch (error) {
      console.error(`Error loading section "${section.id}":`, error);
    }
  }
});
