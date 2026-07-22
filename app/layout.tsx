import type { Metadata } from "next";
import { JetBrains_Mono, Outfit, Syne } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jashwanth B — Data Analyst · Business Analyst",
  description:
    "Portfolio of Jashwanth B — Data & Business Analyst. Dashboards, SLA monitoring, Excel/Power BI/SQL, Rail Wheel Factory data ops. Bangalore, India.",
  openGraph: {
    title: "Jashwanth B — Data & Business Analyst",
    description:
      "Operational analytics, stakeholder reporting, process visibility, and dashboard-driven insights.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${syne.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-ink-950 font-sans text-mist-100">
        {children}
      </body>
    </html>
  );
}
