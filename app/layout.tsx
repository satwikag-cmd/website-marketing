import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { ThemeProvider } from '@/components/site/theme-provider'
import { ScrollRestoration } from '@/components/site/scroll-restoration'
import './globals.css'

const geistSans = Geist({ subsets: ['latin'], variable: '--font-geist-sans' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' })

export const metadata: Metadata = {
  metadataBase: new URL('https://adcanopus.com'),
  title: {
    default: 'Adcanopus — Meta Ads Platform for Modern Advertisers',
    template: '%s | Adcanopus',
  },
  description:
    'Launch campaigns faster, automate repetitive workflows, manage ad creatives, and consolidate multi-account reporting for Meta advertisers.',
  applicationName: 'Adcanopus',
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/icon.svg',
  },
  openGraph: {
    title: 'Adcanopus — Meta Ads Platform',
    description:
      'Launch campaigns faster, automate repetitive workflows, manage ad creatives, and consolidate multi-account reporting for Meta advertisers.',
    url: 'https://adcanopus.com',
    siteName: 'Adcanopus',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Adcanopus — Meta Ads Platform',
    description:
      'Launch campaigns faster, automate repetitive workflows, manage ad creatives, and consolidate multi-account reporting for Meta advertisers.',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: '#fbfbfa',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} bg-background`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var theme = localStorage.getItem('adcanopus_theme');
                if (theme === 'dark') {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="antialiased">
        <ThemeProvider>
          <ScrollRestoration />
          {children}
          {process.env.NODE_ENV === 'production' && <Analytics />}
        </ThemeProvider>
      </body>
    </html>
  )
}
