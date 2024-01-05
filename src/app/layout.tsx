import type { Metadata } from 'next'
import { Urbanist } from 'next/font/google'
import './globals.css'
import { AuthContextProvider } from '@/context/AuthContext'
import { ChatContextProvider } from '@/context/ChatContext'
import { MessageContextProvider } from '@/context/MessageContext'
import { UsernameContextProvider } from '@/context/UsernameContext'
import { UserChatsContextProvider } from '@/context/UserChatsContext'

const urbanist = Urbanist({ weight: ['400', '500', '600'], subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Chattastic',
  description: 'Real-time chat app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <AuthContextProvider>
        <ChatContextProvider>
          <MessageContextProvider>
            <UsernameContextProvider>
              <UserChatsContextProvider>
                <body className={urbanist.className}>{children}</body>
              </UserChatsContextProvider>
            </UsernameContextProvider>
          </MessageContextProvider>
        </ChatContextProvider>
      </AuthContextProvider>
    </html>
  )
}
