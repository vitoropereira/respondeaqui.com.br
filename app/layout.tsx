import ClientOnly from './components/ClientOnly'
import NextNProgress from './components/ProgressBar'
import LoginModal from './components/modals/LoginModal'
import RegisterModal from './components/modals/RegisterModal'
import './globals.css'

import { ReactNode } from 'react'
import ToasterProvider from './providers/ToasterProvider'

export const metadata = {
  title: 'Responde Aqui',
  description: 'Responde Aqui',
}

export default async function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html>
      <body className="h-screen">
        <ClientOnly>
          <ToasterProvider />
          <NextNProgress />
          <LoginModal />
          <RegisterModal />
        </ClientOnly>
        <div>{children}</div>
      </body>
    </html>
  )
}
