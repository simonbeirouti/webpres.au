import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Manrope } from 'next/font/google';
import { UserProvider } from '@/lib/auth';
import { getUser } from '@/lib/db/queries';
import { Toaster } from "@/components/ui/sonner"

const title = "WebPress";
const description =
  "Website for WebPress that showcases the work history, services and pricing on services that are offered by WebPress";
const url = "https://webpress.au";
const siteName = "WebPress";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.BASE_URL || url),
  robots: "index, follow",
  title: {
    default: title,
    template: title + " | %s",
  },
  description,
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title,
    description,
    url,
    siteName,
    images: [
      {
        url: "https://webpress.au/content/og.jpg",
        width: 1200,
        height: 630,
        alt: "OG image for WebPress",
        type: "image/jpg",
      },
    ],
  },
};

export const viewport: Viewport = {
  maximumScale: 1,
};

const manrope = Manrope({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let userPromise = getUser();

  return (
    <html
      lang="en"
      className={`bg-white dark:bg-gray-950 text-black dark:text-white ${manrope.className}`}
    >
      <body className="min-h-[100dvh]">
        <UserProvider userPromise={userPromise}>
          {children}
          <Toaster />
        </UserProvider>
      </body>
    </html>
  );
}
