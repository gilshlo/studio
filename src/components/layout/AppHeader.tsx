import Link from 'next/link';
import Image from 'next/image'; // Import next/image
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { UserCircle } from 'lucide-react';

export default function AppHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center justify-between max-w-screen-2xl px-4 md:px-6"> {/* Adjusted header height for larger logo */}
        <div className="flex items-center gap-4">
          <SidebarTrigger className="md:hidden" />
          <Link href="/" className="flex items-center" aria-label="Institute of Tax Consultants in Israel Home">
            <Image
              src="http://www.ymas.org.il/App_Themes/default/Images/logo2.jpg" 
              alt="Institute of Tax Consultants in Israel Logo"
              width={162} // Enlarged by 120% (135 * 1.2)
              height={48} // Enlarged by 120% (40 * 1.2)
              priority 
              data-ai-hint="organization logo"
            />
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/login" passHref>
            <Button variant="outline" size="sm" className="gap-2">
              <UserCircle className="h-5 w-5" />
              <span className="hidden sm:inline">כניסה</span>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
