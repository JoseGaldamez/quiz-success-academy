import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/lib/ReduxProvider";
import { Footer } from "@/common/Footer";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Quiz - Success Academy",
  description: "Prueba tu nivel de ingles con nuestro quiz.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className} style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }} suppressHydrationWarning>
        <ReduxProvider>
          {children}
          <Footer />
          <Toaster position="bottom-right" />
        </ReduxProvider>
      </body>
    </html>
  );
}
