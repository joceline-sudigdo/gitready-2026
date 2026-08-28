import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppinsBody = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const poppinsHeading = Poppins({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-heading",
  display: "swap",
});

export const metadata: Metadata = {
  title: "GitReady 2.0 : Future Career Preparation Through Digital Portfolio",
  description:
    "Workshop hybrid yang membekali mahasiswa dengan keterampilan Git & GitHub serta digital portfolio untuk berkolaborasi dalam proyek dan mempersiapkan diri menghadapi dunia industri secara profesional.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={`${poppinsBody.variable} ${poppinsHeading.variable}`}>
        {children}
      </body>
    </html>
  );
}
