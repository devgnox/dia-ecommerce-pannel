import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { ModalProvider } from "@/providers/ModalProvider";
import ToastProvider from "@/providers/ToastProvider";
import Footer from "@/components/Footer";
import ThemeProvider from "@/providers/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dia Store Admin Dashboard",
  description: "Admin Dashboard for Dia store",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/images/dia.svg",
        href: "/images/dia.svg",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <body className={inter.className}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <ToastProvider />
            <ModalProvider />

            <div className="min-h-screen">{children}</div>
            <Footer />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
