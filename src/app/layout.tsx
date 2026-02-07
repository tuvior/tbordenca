import type { Metadata } from 'next';
import { Inter, JetBrains_Mono, Playwrite_AU_VIC, Poppins } from 'next/font/google';
import Script from 'next/script';

import BlogRouteClass from '@/app/_components/BlogRouteClass';
import Footer from '@/app/_components/Footer';
import Header from '@/app/_components/Header';
import ScrollToTop from '@/app/_components/ScrollToTop';
import { ThemeProvider } from '@/app/_context/ThemeProvider';
import { profileData } from '@/data/profileData';
import { siteData } from '@/data/siteData';

import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '600', '700'],
});

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  weight: ['400', '500', '600', '700'],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  style: ['normal', 'italic'],
  weight: ['400', '700'],
});

const playwriteAustraliaVictoria = Playwrite_AU_VIC({
  variable: '--font-playwrite-auvic',
  style: 'normal',
  weight: ['300', '400'],
});

const ogImageUrl = `${siteData.url}/preview.png`;

const themeInitScript = `
(() => {
  try {
    const storedTheme = localStorage.getItem("theme");
    const theme = storedTheme || "dark";
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.setAttribute("content", theme === "dark" ? "#2E3440" : "#ECEFF4");
    }
  } catch {
    // Ignore storage or DOM access errors.
  }
})();
`;

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Website',
  name: siteData.name,
  url: siteData.url,
  description: 'Product Manager Portfolio',
  image: ogImageUrl,
  author: {
    '@type': 'Person',
    name: profileData.name,
  },
};

export const metadata: Metadata = {
  metadataBase: new URL(siteData.url),
  title: {
    default: siteData.name,
    template: `%s - ${siteData.name}`,
  },
  description: profileData.description,
  openGraph: {
    title: profileData.name,
    siteName: siteData.name,
    description: 'Product Manager Portfolio',
    type: 'website',
    locale: 'en_US',
    url: siteData.url,
    images: [
      {
        url: ogImageUrl,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: themeInitScript }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
        />
      </head>
      <body
        className={`${inter.variable} ${poppins.variable} ${jetbrainsMono.variable} ${playwriteAustraliaVictoria.variable} flex min-h-screen flex-col antialiased`}
      >
        <ThemeProvider>
          <BlogRouteClass />
          <ScrollToTop />
          <Header />
          <main className="flex-1 pt-24">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
