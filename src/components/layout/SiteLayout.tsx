import React from 'react';
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
