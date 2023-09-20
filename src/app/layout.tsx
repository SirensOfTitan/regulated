import "./globals.css";
import "./constants.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "regulated.app",
  description: "Shows a series of products that have regulatory approval."
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="main">{children}</div>
      </body>
    </html>
  );
}
