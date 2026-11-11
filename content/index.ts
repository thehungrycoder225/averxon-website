export * from "./schema";
export * from "./assetManifest";
export * from "./chapters";
export * from "./games";
export * from "./achievements";
export * from "./news";

export interface NavItem {
  label: string;
  href: string;
  description: string;
}

export const PRIMARY_NAV_ITEMS: NavItem[] = [
  {
    label: "Home",
    href: "/",
    description: "Six-chapter immersive narrative and cultural overview",
  },
  {
    label: "About",
    href: "/about",
    description: "Mission, cultural preservation methodology, and three pillars",
  },
  {
    label: "Our Games",
    href: "/games",
    description:
      "Legend of Bakunawa: Chronicles of Babaylan, Habulan: The Curse of the 5th Bell, and Myth Mayhem",
  },
  {
    label: "Achievements",
    href: "/achievements",
    description: "Level Up 2.0 & 3.0 finalist recognitions and partnerships",
  },
  {
    label: "News & Events",
    href: "/news",
    description: "Development updates, cultural essays, and showcase dispatches",
  },
  {
    label: "Connect",
    href: "/connect",
    description: "Collaborate with AVERXON on games, research, and events",
  },
];
