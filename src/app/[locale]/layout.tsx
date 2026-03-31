import { Metadata } from 'next'
import { Inter } from 'next/font/google'
import React from 'react'
// Import global styles
import { clientEnvironment } from 'src/environments/client'

import './globals.css'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  description: 'Next.js app with i18n support',
  title: 'Next.js i18n App',
}

export default async function LocaleLayout({
  children,
  params,
}: {
  readonly children: React.ReactNode
  readonly params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  return (
    <html dir={dir(locale)} lang={locale}>
      <body
        className={inter.className}
        suppressHydrationWarning={clientEnvironment.suppressHydrationWarning}
      >
        {children}
      </body>
    </html>
  )
}
