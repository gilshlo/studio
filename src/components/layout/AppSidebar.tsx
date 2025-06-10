
import Link from 'next/link';
import {
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  SidebarFooter,
} from '@/components/ui/sidebar';
import {
  Home,
  Newspaper,
  CalendarDays,
  Users,
  Award,
  Info,
  Mail,
  LogIn,
  UserCircle,
  HelpCircle,
  BookOpenCheck,
  MessageSquareMore
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const navItems = [
  { href: '/', label: 'דף הבית', icon: Home, public: true },
  { href: '/about', label: 'אודות הלשכה', icon: Info, public: true },
  { href: '/content-library', label: 'ספרייה מקצועית', icon: BookOpenCheck, public: false },
  { href: '/events', label: 'אירועים וכנסים', icon: CalendarDays, public: true },
  { href: '/member-directory', label: 'אינדקס חברים', icon: Users, public: true },
  { href: '/member-benefits', label: 'הטבות לחברים', icon: Award, public: true },
  { href: '/faq', label: 'שאלות ותשובות', icon: HelpCircle, public: true },
  { href: '/contact', label: 'צור קשר', icon: Mail, public: true },
];

const memberNavItems = [
  { href: '/profile', label: 'ניהול פרופיל', icon: UserCircle, public: false },
  { href: '/inquiries', label: 'פניות אישיות', icon: MessageSquareMore, public: false },
];

// This is a conceptual check. Actual auth logic would be more complex.
const isAuthenticated = false; 

export default function AppSidebar() {
  return (
    <>
      <SidebarHeader className="p-4 border-b">
        <span className="font-headline text-lg font-semibold text-sidebar-foreground">ניווט</span>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          {navItems.map((item) => {
            if (!item.public && !isAuthenticated) return null; 
            return (
              <SidebarMenuItem key={item.label}>
                <SidebarMenuButton
                  href={item.href}
                  className="w-full justify-start text-sm"
                  tooltip={item.label}
                >
                  <item.icon className="h-5 w-5 me-3" />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>

        {isAuthenticated && ( 
          <>
            <div className="my-3 h-px w-full bg-sidebar-border" />
            <SidebarMenu>
              {memberNavItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton
                    href={item.href}
                    className="w-full justify-start text-sm"
                    tooltip={item.label}
                  >
                    <item.icon className="h-5 w-5 me-3" />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </>
        )}
      </SidebarContent>
      <SidebarFooter className="p-4 border-t">
        {!isAuthenticated && ( 
          <Link href="/login" passHref>
            <Button variant="default" className="w-full">
              <LogIn className="h-5 w-5 me-2" />
              כניסה / הרשמה
            </Button>
          </Link>
        )}
         {isAuthenticated && ( 
          <Button variant="outline" className="w-full" onClick={() => console.log("Logout clicked")}> {/* Placeholder for logout */}
            <LogIn className="h-5 w-5 me-2 rotate-180" />
            התנתקות
          </Button>
        )}
      </SidebarFooter>
    </>
  );
}
