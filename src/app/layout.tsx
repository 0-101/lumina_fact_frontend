import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Layout } from '@/components/layout';
import { Toaster } from '@/components/ui/toaster';
import { MockUserProvider } from '@/context/user-context';

export const metadata: Metadata = {
  title: 'Lumina Fact',
  description: 'A platform for misinformation verification.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Source+Code+Pro&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={cn(
          'min-h-screen bg-background font-body antialiased'
        )}
      >
        <MockUserProvider>
          <Layout>{children}</Layout>
          <Toaster />
        </MockUserProvider>
      </body>
    </html>
  );
}
