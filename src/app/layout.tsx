import type { Metadata } from 'next';
import './globals.css';
import { SidebarProvider } from '@/components/ui/sidebar';
import SiteLayout from '@/components/layout/SiteLayout';
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: 'Tax Chamber Hub',
  description: 'Israeli Tax Advisors Chamber',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Alegreya:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <SidebarProvider>
          <SiteLayout>{children}</SiteLayout>
        </SidebarProvider>
        <Toaster />
      </body>
    </html>
  );
}
