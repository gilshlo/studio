import SectionTitle from '@/components/shared/SectionTitle';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Users, Search, Filter, MapPin, Briefcase, Star, Download } from 'lucide-react';
import Image from 'next/image';

const members = [
  { id: "1", name: "יוסי כהן", expertise: "מס הכנסה, מע\"מ", location: "תל אביב", imageUrl: "https://placehold.co/100x100.png", imageHint:"person avatar", rating: 4.5, description: "יועץ מס ותיק עם ניסיון של 15 שנה, מתמחה בעסקים קטנים ובינוניים." },
  { id: "2", name: "שרה לוי", expertise: "מיסוי בינלאומי, מקרקעין", location: "ירושלים", imageUrl: "https://placehold.co/100x100.png", imageHint:"person avatar", rating: 5, description: "מומחית למיסוי בינלאומי ומיסוי מקרקעין, מרצה ובעלת משרד בוטיק." },
  { id: "3", name: "דוד אברהם", expertise: "מס חברות, עידוד השקעות", location: "חיפה", imageUrl: "https://placehold.co/100x100.png", imageHint:"person avatar", rating: 4, description: "מתמקד בייעוץ לחברות טכנולוגיה וסטארט-אפים, כולל הטבות מס." },
  { id: "4", name: "רחל ישראלי", expertise: "מיסוי פרישה, תכנון מס", location: "באר שבע", imageUrl: "https://placehold.co/100x100.png", imageHint:"person avatar", rating: 4.8, description: "עוסקת בייעוץ פרישה ובתכנון מס אישי לבעלי הון." },
];

export default function MemberDirectoryPage() {
  return (
    <div className="space-y-8">
      <SectionTitle>
        <Users className="inline-block me-3 w-8 h-8" />
        אינדקס חברים
      </SectionTitle>

      <Card className="p-4 sm:p-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
          <div>
            <label htmlFor="nameSearch" className="block text-sm font-medium text-foreground mb-1">שם יועץ/משרד</label>
            <div className="relative">
              <Input type="search" id="nameSearch" placeholder="הקלד שם..." className="ps-10" />
              <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            </div>
          </div>
          <div>
            <label htmlFor="expertiseFilter" className="block text-sm font-medium text-foreground mb-1">תחום התמחות</label>
            <Select dir="rtl">
              <SelectTrigger id="expertiseFilter">
                <SelectValue placeholder="בחר תחום" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">הכל</SelectItem>
                <SelectItem value="income-tax">מס הכנסה</SelectItem>
                <SelectItem value="vat">מע\"מ</SelectItem>
                <SelectItem value="international">מיסוי בינלאומי</SelectItem>
                <SelectItem value="real-estate">מקרקעין</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label htmlFor="locationFilter" className="block text-sm font-medium text-foreground mb-1">מיקום</label>
            <Select dir="rtl">
              <SelectTrigger id="locationFilter">
                <SelectValue placeholder="בחר אזור" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">כל הארץ</SelectItem>
                <SelectItem value="tel-aviv">תל אביב והמרכז</SelectItem>
                <SelectItem value="jerusalem">ירושלים</SelectItem>
                <SelectItem value="haifa">חיפה והצפון</SelectItem>
                <SelectItem value="south">דרום</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button className="w-full md:w-auto">
            <Filter className="me-2 h-4 w-4" />
            סנן
          </Button>
        </div>
        <div className="mt-4 flex justify-end">
            <Button variant="outline" size="sm">
                <Download className="me-2 h-4 w-4" />
                ייצוא נתונים (מוגבל)
            </Button>
        </div>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        {members.map((member) => (
          <Card key={member.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="flex flex-row items-start gap-4">
              <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-accent shrink-0">
                <Image src={member.imageUrl} alt={member.name} layout="fill" objectFit="cover" data-ai-hint={member.imageHint}/>
              </div>
              <div className="flex-grow">
                <CardTitle className="font-headline text-xl">{member.name}</CardTitle>
                <div className="flex items-center text-sm text-muted-foreground mt-1">
                  <Briefcase className="me-1.5 h-4 w-4 text-primary" /> {member.expertise}
                </div>
                <div className="flex items-center text-sm text-muted-foreground mt-1">
                  <MapPin className="me-1.5 h-4 w-4 text-primary" /> {member.location}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-foreground">{member.description}</p>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <div className="flex items-center">
                <Star className="h-5 w-5 text-yellow-400 fill-yellow-400 me-1" />
                <span className="font-semibold">{member.rating.toFixed(1)}</span>
              </div>
              <Button variant="outline" size="sm">פרטים נוספים</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
