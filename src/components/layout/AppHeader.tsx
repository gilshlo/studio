
import Link from 'next/link';
// Image import no longer needed here
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { UserCircle } from 'lucide-react';

export default function AppHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center justify-between max-w-screen-2xl px-4 md:px-6">
        <div className="flex items-center"> {/* Removed gap-4 as logo is moved */}
          <SidebarTrigger className="md:hidden" />
          {/* Logo removed from here */}
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="gap-2" asChild>
            <Link href="/login">
              <UserCircle className="h-5 w-5" />
              <span className="hidden sm:inline">כניסה</span>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
