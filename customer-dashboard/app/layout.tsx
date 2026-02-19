import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ClientLayout from '@/components/ClientLayout'
import { LocaleProvider } from '@/context/LocaleContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Customer Dashboard',
  description: 'Your personal customer portal for orders, support, and account management',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LocaleProvider>
          <ClientLayout>
            {children}
          </ClientLayout>
        </LocaleProvider>
      </body>
    </html>
  )
}
