import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { BriefcaseBusiness, UserCircle } from 'lucide-react';

export default function AppHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between max-w-screen-2xl px-4 md:px-6">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="md:hidden" />
          <Link href="/" className="flex items-center gap-2" aria-label="Tax Chamber Hub Home">
            <BriefcaseBusiness className="h-7 w-7 text-primary" />
            <span className="font-headline text-xl font-semibold text-primary">Tax Chamber Hub</span>
          </Link>
        </div>
        <div className="flex items-center gap-3">
          {/* Placeholder for future Login/User Avatar */}
          <Link href="/login" legacyBehavior passHref>
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
