import Link from 'next/link';
import { Facebook, Linkedin, Twitter, Youtube, Rss } from 'lucide-react'; // XIcon might not exist, using Twitter

export default function AppFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted text-muted-foreground py-8 border-t">
      <div className="container max-w-screen-2xl px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-start">
          <div>
            <h3 className="font-headline text-lg font-semibold text-foreground mb-3">לשכת יועצי המס בישראל</h3>
            <p className="text-sm">ארגון הגג של יועצי המס המוסמכים בישראל.</p>
            <p className="text-sm mt-2">כתובת: רחוב לדוגמה 123, תל אביב</p>
            <p className="text-sm">טלפון: 03-1234567</p>
          </div>
          <div>
            <h3 className="font-headline text-lg font-semibold text-foreground mb-3">קישורים שימושיים</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-primary">אודות הלשכה</Link></li>
              <li><Link href="/events" className="hover:text-primary">אירועים וכנסים</Link></li>
              <li><Link href="/member-directory" className="hover:text-primary">חיפוש יועץ מס</Link></li>
              <li><Link href="/contact" className="hover:text-primary">צור קשר</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-headline text-lg font-semibold text-foreground mb-3">עקבו אחרינו</h3>
            <div className="flex justify-center md:justify-start space-s-4">
              <Link href="#" aria-label="Facebook" className="text-muted-foreground hover:text-primary"><Facebook size={24} /></Link>
              <Link href="#" aria-label="LinkedIn" className="text-muted-foreground hover:text-primary"><Linkedin size={24} /></Link>
              <Link href="#" aria-label="Twitter" className="text-muted-foreground hover:text-primary"><Twitter size={24} /></Link>
              <Link href="#" aria-label="YouTube" className="text-muted-foreground hover:text-primary"><Youtube size={24} /></Link>
              <Link href="#" aria-label="RSS Feed" className="text-muted-foreground hover:text-primary"><Rss size={24} /></Link>
            </div>
            <div className="mt-4">
              <h4 className="font-semibold text-foreground mb-1">קישורים חיצוניים</h4>
              <ul className="text-sm space-y-1">
                <li><Link href="#" target="_blank" rel="noopener noreferrer" className="hover:text-primary">רשות המסים בישראל</Link></li>
                <li><Link href="#" target="_blank" rel="noopener noreferrer" className="hover:text-primary">המוסד לביטוח לאומי</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t mt-8 pt-6 text-center text-sm">
          <p>&copy; {currentYear} לשכת יועצי המס בישראל. כל הזכויות שמורות.</p>
          <p className="mt-1">פותח על ידי סטודיו XYZ</p>
        </div>
      </div>
    </footer>
  );
}
