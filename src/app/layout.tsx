import BottomNav from '@/components/bottom-nav';
import Header from '@/components/header';
import { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import { Geist } from 'next/font/google';
import type { PropsWithChildren } from 'react';
import './globals.css';

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: '코스빌더',
  description: '여행의 시작과 끝을 함께해요',
} satisfies Metadata;

const geistSans = Geist({
  display: 'swap',
  subsets: ['latin'],
});

export default async function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="ko" className={geistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col min-h-screen bg-background text-foreground max-w-screen-md mx-auto shadow-2xl border">
            <Header />
            <main className="flex-grow overflow-y-auto pb-20 p-6">
              {children}
            </main>
            <BottomNav />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
