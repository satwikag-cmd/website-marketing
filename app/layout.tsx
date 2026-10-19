import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono, Righteous } from 'next/font/google'
import { ThemeProvider } from '@/components/site/theme-provider'
import { AuthProvider } from '@/components/site/auth-context'
import { ScrollRestoration } from '@/components/site/scroll-restoration'
import './globals.css'

const geistSans = Geist({ subsets: ['latin'], variable: '--font-geist-sans' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' })
const righteous = Righteous({ weight: '400', subsets: ['latin'], variable: '--font-righteous' })

export const metadata: Metadata = {
  metadataBase: new URL('https://scaviyo.com'),
  title: {
    default: 'Scaviyo — Meta Ads Platform for Modern Advertisers',
    template: '%s | Scaviyo',
  },
  description:
    'Launch campaigns faster, automate repetitive workflows, manage ad creatives, and consolidate multi-account reporting for Meta advertisers.',
  applicationName: 'Scaviyo',
  icons: {
    icon: [
      { url: '/icon.svg?v=2', type: 'image/svg+xml' },
    ],
    apple: '/icon.svg?v=2',
  },
  openGraph: {
    title: 'Scaviyo — Meta Ads Platform',
    description:
      'Launch campaigns faster, automate repetitive workflows, manage ad creatives, and consolidate multi-account reporting for Meta advertisers.',
    url: 'https://scaviyo.com',
    siteName: 'Scaviyo',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Scaviyo — Meta Ads Platform',
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
      className={`${geistSans.variable} ${geistMono.variable} ${righteous.variable} bg-background`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var theme = localStorage.getItem('scaviyo_theme') || localStorage.getItem('adcanopus_theme');
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
          <AuthProvider>
            <ScrollRestoration />
            {children}
            {process.env.NODE_ENV === 'production' && <Analytics />}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
