import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Provider from './components/Provider'
import localFont from 'next/font/local'
import './globals.sass'

const inter = Inter({ subsets: ['latin'] })

const mainFontFamily = localFont({
  src: './sass/fonts/Nexa/Nexa-Heavy.ttf'
})

export const metadata: Metadata = {
  title: 'Street Angels',
  description: 'Criado pro @eiRyder',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={mainFontFamily.className}>
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  )
}
