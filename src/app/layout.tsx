import "./globals.css";
import "./constants.css";
import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "regulated.app",
  description: "Shows a series of products that have regulatory approval.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-0LJYYDV1QJ"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-0LJYYDV1QJ');
        `}
      </Script>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
