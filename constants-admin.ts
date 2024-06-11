import { ToolItemProps } from "./components/tool-item";

export const TOOLS: ToolItemProps[] = [
  {
    title: "Dashboard",
    icon: "/icons/dashboard.svg",
    url: "/dashboard",
    slug: "dashboard",
  },
  {
    title: "Live Agent Takeover",
    icon: "/icons/conversation.svg",
    url: "/live-chat",
    color: "bg-blue-500",
    slug: "liveChat",
  },
  {
    title: "User Management",
    icon: "/icons/admin-user-icon-133438.png",
    url: "/user-management",
    color: "bg-blue-500",
    slug: "userManagement",
  },
  {
    title: "Subscription Management",
    icon: "/Group (3).svg",
    url: "/supscription-management",
    color: "bg-blue-500",
    slug: "supscriptionManagement",
  },
];

export const NAVIGATIONADMIN = [
  {
    title: "HOME",
    icon: "/icons/Fill - Home.svg",
    url: "/home",
    color: "bg-blue-500",
    slug: "home",
  },
  ...TOOLS,
];
export const THEME_MODES = [
  {
    label: "Light",
    value: "light",
  },
  {
    label: "Dark",
    value: "dark",
  },
];

export const MAX_FREE_COUNTS = 5;
export const DAY_IN_MS = 86_400_000;

export const PHOTO_AMOUNT_OPTIONS = [
  {
    value: "1",
    label: "1 Photo",
  },
  {
    value: "2",
    label: "2 Photos",
  },
  {
    value: "3",
    label: "3 Photos",
  },
  {
    value: "4",
    label: "4 Photos",
  },
  {
    value: "5",
    label: "5 Photos",
  },
];

export const PHOTO_RESOLUTION_OPTIONS = [
  {
    value: "256x256",
    label: "256x256",
  },
  {
    value: "512x512",
    label: "512x512",
  },
  {
    value: "1024x1024",
    label: "1024x1024",
  },
];
