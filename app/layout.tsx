import Providers from "./providers";
import './globals.css'
import { Josefin_Sans } from 'next/font/google'

const josefin_sans = Josefin_Sans({ subsets: ['latin'], weight: ["400", "700"] })

export const metadata = {
  title: 'To-do app',
  description: 'Created by Shant',
  icons: {
    icon: '/favicon.ico',
    shortcut: '../public/apple-touch-icon.png',
    apple: '../public/apple-touch-icon.png',
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '../public/apple-touch-icon.png',
    },
  },
  appleWebApp: {
    title: 'ToDo',
    statusBarStyle: 'black-translucent',
    startupImage: [
      '../public/apple-touch-icon.png',
      {
        url: '../public/apple-touch-icon.png',
        media: '(device-width: 768px) and (device-height: 1024px)',
      },
    ],
  },
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
