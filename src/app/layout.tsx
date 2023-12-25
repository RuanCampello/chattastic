import type { Metadata } from 'next'
import { Urbanist } from 'next/font/google'
import './globals.css'

const urbanist = Urbanist({ weight: ['400', '500', '600'], subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Chattastic',
  description: 'Chat app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={urbanist.className}>{children}</body>
    </html>
  )
}
