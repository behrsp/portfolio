import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Portfólio | behrsp',
  description: 'Portfólio profissional de behrsp - Desenvolvedor Full Stack',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <div className="min-h-screen relative overflow-hidden">
          {/* Background decoration */}
          <div style={{
            position: 'absolute',
            top: '-10%',
            left: '-10%',
            width: '40%',
            height: '40%',
            backgroundColor: 'rgba(88, 28, 135, 0.15)',
            borderRadius: '50%',
            filter: 'blur(120px)',
            pointerEvents: 'none',
            zIndex: -1
          }} />
          <div style={{
            position: 'absolute',
            bottom: '-10%',
            right: '-10%',
            width: '40%',
            height: '40%',
            backgroundColor: 'rgba(30, 58, 138, 0.15)',
            borderRadius: '50%',
            filter: 'blur(120px)',
            pointerEvents: 'none',
            zIndex: -1
          }} />
          
          <main>{children}</main>
        </div>
      </body>
    </html>
  )
}
