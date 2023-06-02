import ClientOnly from './components/ClientOnly'
import NextNProgress from './components/ProgressBar'
import './globals.css'

import { ReactNode } from 'react'

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
    <html lang="en">
      <body>
        <ClientOnly>
          <NextNProgress />
        </ClientOnly>
        <div>{children}</div>
      </body>
    </html>
  )
}
