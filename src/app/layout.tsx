import { StoreGuard } from "@/components/custom/store-guard";
import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
// import "./fonts/fonts.css";
import GoogleAnalytics from "@/components/custom/google-analytics";
import { APP_NAME, originURL } from "@/lib/constants";
import "./globals.css";

export const metadata: Metadata = {
  title: APP_NAME,
  description: "Built by Elijah Soladoye",
  icons: {
    // icon: "https://open.spotifycdn.com/cdn/images/favicon32.b64ecc03.png"
    icon: "https://developer-assets.spotifycdn.com/images/favicon.ico"
  },
  metadataBase: new URL(originURL),
  openGraph: {
    description: "Built by Elijah Soladoye",
    // images: [
    //   {
    //     height: 1983,
    //     url: "https://thenextboilerplate.vercel.app/agilitas-og-image.png",
    //     width: 2500,
    //   },
    // ],
    locale: "en_US",
    siteName: APP_NAME,
    title: APP_NAME,
    type: "website",
    url: originURL,
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
