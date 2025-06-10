
import React from 'react';
import Image from 'next/image'; // Added Image import
import Link from 'next/link';   // Added Link import
import { Sidebar, SidebarInset, SidebarRail } from '@/components/ui/sidebar';
import AppHeader from './AppHeader';
import AppSidebar from './AppSidebar';
import AppFooter from './AppFooter';

type SiteLayoutProps = {
  children: React.ReactNode;
};

export default function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader />
      {/* New Centered Logo Section */}
      <div className="flex justify-center py-4 border-b bg-card">
        <Link href="/" aria-label="Institute of Tax Consultants in Israel Home">
          <Image
            src="http://www.ymas.org.il/App_Themes/default/Images/logo2.jpg"
            alt="Institute of Tax Consultants in Israel Logo"
            width={365} 
            height={108}
            priority // Important for LCP
            data-ai-hint="organization logo"
          />
        </Link>
      </div>
      <div className="flex flex-1">
        <Sidebar collapsible="icon" variant="sidebar" side="right" className="border-s">
          <AppSidebar />
          <SidebarRail />
        </Sidebar>
        <SidebarInset className="flex-1 overflow-y-auto">
          <main className="p-4 md:p-6">{children}</main>
        </SidebarInset>
      </div>
      <AppFooter />
    </div>
  );
}
