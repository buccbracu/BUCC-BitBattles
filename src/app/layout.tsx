import type { Metadata } from "next";
import { Cinzel, Lora } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import localFont from 'next/font/local';

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
});

const kragx = localFont({
  src: '../../public/kragx.otf',
  variable: '--font-kragx',
});

export const metadata: Metadata = {
  title: "Bit Battles",
  description: "BUCC",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${lora.variable} ${cinzel.variable} ${kragx.variable} antialiased`}>
        {children}
        <Toaster richColors />
      </body>
    </html>
  );
}
