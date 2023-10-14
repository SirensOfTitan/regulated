import "./globals.css";
import "./constants.css";
import Script from "next/script";
import { Metadata } from "next";

const title =
  "Regulated.app | Your ultimate resource for accredited tech in regulated industries";
const description =
  "Regulated.app provides the latest information on products used in regulated industry like banking, government, and healthcare.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    images: "/opengraph-logo.jpeg",
    description,
    locale: "en_US",
    type: "website",
    url: "https://regulated.app",
  },
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
        strategy="lazyOnload"
      />
      <Script id="google-analytics" strategy="lazyOnload">
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
