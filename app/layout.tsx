import Providers from "./providers";
import { Suspense } from "react";
import "./globals.css";
import { Josefin_Sans } from "next/font/google";
import ThemeSwitcher from "./ThemeSwitcher";

const josefin_sans = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata = {
  title: "To-do app",
  description: "Created by Shant",
  icons: {
    icon: "/favicon.ico",
    shortcut: "../public/apple-touch-icon.png",
    apple: "../public/apple-touch-icon.png",
    other: {
      rel: "apple-touch-icon-precomposed",
      url: "../public/apple-touch-icon.png",
    },
  },
  appleWebApp: {
    title: "ToDo",
    statusBarStyle: "black-translucent",
    startupImage: [
      "../public/apple-touch-icon.png",
      {
        url: "../public/apple-touch-icon.png",
        media: "(device-width: 768px) and (device-height: 1024px)",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={josefin_sans.className + ` overflow-hidden, overscroll-none`}
      suppressHydrationWarning
    >
      <body className="dark:bg-[#161722] bg-[#fafafa]">
        <Providers>
          <main
            className="dark:text-white h-screen text-black 
            dark:bg-dark-mobile md:dark:bg-dark-desktop 
            bg-light-mobile md:bg-light-desktop 
            bg-contain bg-no-repeat"
          >
            <div className="flex items-center justify-between px-6 max-w-4xl mx-auto pt-12">
              <h1 className="text-3xl tracking-[0.3em] font-bold text-white ">
                TODO
              </h1>
              <ThemeSwitcher />
            </div>
            <Suspense>{children}</Suspense>
          </main>
        </Providers>
      </body>
    </html>
  );
}
