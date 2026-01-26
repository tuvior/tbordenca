import { profileData } from '@/data/profileData';
import type { Metadata } from 'next';
import { Inter, JetBrains_Mono, Poppins } from 'next/font/google';
import Script from 'next/script';
import Footer from './_components/Footer';
import Header from './_components/Header';
import ScrollToTop from './_components/ScrollToTop';
import { ThemeProvider } from './_context/ThemeProvider';
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

const siteName = 'tbordenca';
const siteUrl = 'https://tuvior.github.io/tbordenca';
const ogImageUrl = `${siteUrl}/img/preview.png`;

const themeInitScript = `
(() => {
  try {
    const storedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    const theme = storedTheme || (prefersDark ? "dark" : "light");
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
  name: 'tbordenca',
  url: siteUrl,
  description: 'Product Manager Portfolio',
  image: ogImageUrl,
  author: {
    '@type': 'Person',
    name: profileData.name,
  },
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: `%s - ${siteName}`,
  },
  description: profileData.description,
  openGraph: {
    title: profileData.name,
    siteName: siteName,
    description: 'Product Manager Portfolio',
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
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
        className={`${inter.variable} ${poppins.variable} ${jetbrainsMono.variable} flex min-h-screen flex-col antialiased`}
      >
        <ThemeProvider>
          <ScrollToTop />
          <Header />
          <main className="flex-1 pt-24">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
