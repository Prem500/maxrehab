import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://maxrehab.in"),
  title: "MaxRehab — Advanced Neurorehabilitation Center",
  description:
    "MaxRehab Advanced Neurorehabilitation Center — Specialized neuro-rehabilitation, stroke recovery, spinal cord injury care, and physiotherapy in Dehri on Sone, Bihar.",
  icons: {
    icon: "/fulllogo.png",
    shortcut: "/fulllogo.png",
    apple: "/fulllogo.png",
  },
  openGraph: {
    title: "MaxRehab — Advanced Neurorehabilitation Center",
    description:
      "Premier neurorehabilitation and physiotherapy centre in Dehri on Sone, Bihar.",
    images: [{ url: "/fulllogo.png" }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-900 text-slate-100 min-h-screen antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
