import type { Metadata } from 'next'
import { Urbanist } from 'next/font/google'
import './globals.css'
import { AuthContextProvider } from '@/context/AuthContext'
import { ChatContextProvider } from '@/context/ChatContext'
import { MessageContextProvider } from '@/context/MessageContext'
import { UserChatsContextProvider } from '@/context/UserChatsContext'
import { ReactNode } from 'react'

const urbanist = Urbanist({ weight: ['400', '500', '600'], subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Chattastic',
  description: 'Real-time chat app',
}

const contextWrapper = (children: ReactNode) => (
  <AuthContextProvider>
      <ChatContextProvider>
        <MessageContextProvider>
          <UserChatsContextProvider>
            {children}
          </UserChatsContextProvider>
        </MessageContextProvider>
      </ChatContextProvider>
    </AuthContextProvider>
)

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      {contextWrapper(
        <body className={urbanist.className}>{children}</body>
      )}
    </html>
  )
}
