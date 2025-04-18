import { StoreGuard } from "@/components/custom/store-guard";
import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
// import "./fonts/fonts.css";
import GoogleAnalytics from "@/components/custom/google-analytics";
import { APP_FAVICON_URL, APP_NAME, originURL } from "@/lib/constants";
import "./globals.css";

export const metadata: Metadata = {
  title: APP_NAME,
  description: "Built by Elijah Soladoye",
  icons: {
    icon: APP_FAVICON_URL
  },
  metadataBase: new URL(originURL),
  openGraph: {
    description: "Built by Elijah Soladoye",
    images: [{ url: APP_FAVICON_URL, }],
    locale: "en_US",
    siteName: APP_NAME,
    title: APP_NAME,
    type: "website",
    url: originURL,
  },
  twitter: {
    description: "Built by Elijah Soladoye",
    images: [{ url: APP_FAVICON_URL, }],
    title: APP_NAME,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <GoogleAnalytics />
      <body
        className={`antialiased bg-black text-white`}
      >
        <StoreGuard>
          {children}
          <Toaster position="top-right" />
        </StoreGuard>
      </body>
    </html>
  );
}
