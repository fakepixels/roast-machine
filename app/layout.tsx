import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import OnchainProvider from '../components/OnchainProvider';
import '@coinbase/onchainkit/styles.css';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Roast machine",
  description: "Toasty roast",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <OnchainProvider>{children}</OnchainProvider>
      </body>
    </html>
  )
}
