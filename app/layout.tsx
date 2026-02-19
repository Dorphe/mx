import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CoPilot — Dynamic Troubleshooting",
  description: "MaintainX CoPilot troubleshooting assistant for field technicians",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
