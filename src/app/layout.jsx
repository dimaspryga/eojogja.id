import { Inter, Agdasima } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { AuthProvider } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import { Analytics } from "@vercel/analytics/next";

const fontTitle = Agdasima({
  variable: "--font-agdasima",
  weight: ["400", "700"],
  subsets: ["latin"],
});

const fontSans = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "Home | Eojogja.id",
  description: "Your next adventure starts here.",
  icons: {
    icon: "/assets/parama-ico.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-inter antialiased",
          fontSans.variable,
          fontTitle.variable
        )}
      >
        <AuthProvider>
          {children}
          <Analytics />
          <Toaster richColors position="top-center" duration={3000} />
        </AuthProvider>
      </body>
    </html>
  );
}
