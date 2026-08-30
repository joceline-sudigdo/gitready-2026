import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: [
    "100",
    "200",
    "300",
    "400",
    "500",
    "600",
    "700",
    "800",
    "900",
  ],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "GitReady — Workshop Git & GitHub",
  description:
    "Belajar Git & GitHub dari nol: workflow simulator interaktif, mini game, dan sesi bareng instruktur.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className={poppins.className}>
        {children}
      </body>
    </html>
  );
}

