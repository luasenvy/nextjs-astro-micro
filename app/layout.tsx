import "@/styles/global.css";

export const metadata = {
  title: "Astro Micro",
  description: "Astro Micro Template",
  icons: [
    {
      rel: "icon",
      type: "image/svg+xml",
      url: "/favicon.svg",
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en">{children}</html>;
}
