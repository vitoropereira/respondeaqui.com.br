import { ReactNode } from 'react'
import getCurrentUser from '../actions/getCurrentUser'

export const metadata = {
  title: 'Responde Aqui',
  description: 'Responde Aqui',
}

export default async function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  const currentUser = await getCurrentUser()
  return (
    <html>
      <body className="h-screen">
        <div>{children}</div>
      </body>
    </html>
  )
}
