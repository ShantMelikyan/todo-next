import Providers from "./providers";
import './globals.css'
import { Josefin_Sans } from 'next/font/google'

const josefin_sans = Josefin_Sans({ subsets: ['latin'], })

export const metadata = {
  title: 'To do app',
  description: 'Created by Shant',
  icon: [
    '/favicon.png'
  ]
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={josefin_sans.className}>
      <body className="dark:bg-[#161722] bg-[#fafafa]">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
