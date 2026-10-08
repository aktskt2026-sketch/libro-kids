import type { Metadata } from "next";
import "./globals.css";
import "./storybook.css";
import "./nature.css";
import "./park-game.css";
import "./mascot-animation.css";
import "./family-auth.css";
import "./points.css";
import { AppProvider } from "@/hooks/use-app";
export const metadata: Metadata = {
  title: "Libro-Kids · Bilim bilan o‘sing!",
  description:
    "Bilbiljon bilan o‘qing, o‘ynang va bilim daraxtingizni o‘stiring.",
  icons: { icon: "/favicon.svg" },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uz">
      <body>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
