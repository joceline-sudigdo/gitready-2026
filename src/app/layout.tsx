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
});

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
<<<<<<< HEAD
  title: "GitReady 2.0 : Future Career Preparation Through Digital Portfolio",
  description:
    "Workshop hybrid yang membekali mahasiswa dengan keterampilan Git & GitHub serta digital portfolio untuk berkolaborasi dalam proyek dan mempersiapkan diri menghadapi dunia industri secara profesional.",
=======
  title: "GitReady — Workshop Git & GitHub",
  description:
    "Belajar Git & GitHub dari nol: workflow simulator interaktif, mini game, dan sesi bareng instruktur.",
>>>>>>> cc1c5b6588e96428e40eb94a0951e4e585da7965
};

export default function RootLayout({
  children,
<<<<<<< HEAD
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={`${poppinsBody.variable} ${poppinsHeading.variable}`}>
=======
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={poppins.className}>
>>>>>>> cc1c5b6588e96428e40eb94a0951e4e585da7965
        {children}
      </body>
    </html>
  );
}
<<<<<<< HEAD
=======

>>>>>>> cc1c5b6588e96428e40eb94a0951e4e585da7965
