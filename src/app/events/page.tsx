import Link from 'next/link';
import SectionTitle from '@/components/shared/SectionTitle';
import PlaceholderCard from '@/components/shared/PlaceholderCard'; // Re-using for event appearance
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalendarDays, Search, Filter, Tags, MapPin } from 'lucide-react';
import Image from 'next/image';

const events = [
  { id: "1", title: "כנס שנתי ליועצי מס 2024", description: "הכנס המרכזי של הלשכה עם מיטב המרצים והחידושים בתחום המיסוי בישראל.", category: "כנסים", date: "20-22 באוגוסט 2024", location: "מלון דן, אילת", imageUrl: "https://placehold.co/400x250.png", imageHint: "conference audience" },
  { id: "2", title: "סדנת מיסוי בינלאומי מתקדמת", description: "העמקה בסוגיות מיסוי חוצה גבולות, אמנות מס ותכנוני מס לגיטימיים.", category: "סדנאות", date: "5 בספטמבר 2024", location: "משרדי הלשכה, תל אביב", imageUrl: "https://placehold.co/400x250.png", imageHint: "globe puzzle" },
  { id: "3", title: "יום עיון: עדכוני חקיקה במע\"מ", description: "סקירת השינויים האחרונים בחוק המע\"מ והשפעתם על עסקים.", category: "ימי עיון", date: "18 בספטמבר 2024", location: "מקוון (Zoom)", imageUrl: "https://placehold.co/400x250.png", imageHint: "documents law" },
  { id: "4", title: "קורס מיסוי מקרקעין למתחילים", description: "יסודות מיסוי המקרקעין, כולל מס שבח, מס רכישה והיטל השבחה.", category: "קורסים", date: "מתחיל ב-10 באוקטובר 2024", location: "מרכז ההדרכה, חיפה", imageUrl: "https://placehold.co/400x250.png", imageHint: "buildings city" },
];

export default function EventsPage() {
  return (
    <div className="space-y-8">
      <SectionTitle>
        <CalendarDays className="inline-block me-3 w-8 h-8" />
        אירועים וכנסים
      </SectionTitle>

      <Card className="p-4 sm:p-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
          <div className="lg:col-span-2">
            <label htmlFor="eventSearch" className="block text-sm font-medium text-foreground mb-1">חיפוש אירוע</label>
            <div className="relative">
              <Input type="search" id="eventSearch" placeholder="שם אירוע, נושא, מרצה..." className="ps-10" />
              <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            </div>
          </div>
          <div>
            <label htmlFor="eventTypeFilter" className="block text-sm font-medium text-foreground mb-1">סוג אירוע</label>
            <Select dir="rtl">
              <SelectTrigger id="eventTypeFilter">
                <SelectValue placeholder="בחר סוג" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">הכל</SelectItem>
                <SelectItem value="conference">כנסים</SelectItem>
                <SelectItem value="workshop">סדנאות</SelectItem>
                <SelectItem value="seminar">ימי עיון</SelectItem>
                <SelectItem value="course">קורסים</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label htmlFor="eventTagFilter" className="block text-sm font-medium text-foreground mb-1">תגיות</label>
            <Select dir="rtl">
              <SelectTrigger id="eventTagFilter">
                <SelectValue placeholder="בחר תגית" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">הכל</SelectItem>
                <SelectItem value="income-tax">מס הכנסה</SelectItem>
                <SelectItem value="vat">מע\"מ</SelectItem>
                <SelectItem value="international-tax">מיסוי בינלאומי</SelectItem>
                <SelectItem value="real-estate">מקרקעין</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>
      
      {/* Placeholder for Calendar View */}
      <Card className="p-6 shadow-sm">
        <CardHeader>
          <CardTitle className="font-headline text-xl flex items-center">
            <CalendarDays className="me-2 h-5 w-5" />
            תצוגת לוח שנה
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-muted h-64 flex items-center justify-center rounded-md">
            <p className="text-muted-foreground">תצוגת לוח שנה תופיע כאן</p>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <Card key={event.id} className="flex flex-col h-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            {event.imageUrl && (
              <div className="relative w-full h-48">
                <Image
                  src={event.imageUrl}
                  alt={event.title}
                  layout="fill"
                  objectFit="cover"
                  data-ai-hint={event.imageHint}
                />
              </div>
            )}
            <CardHeader>
              <p className="text-xs text-accent font-semibold mb-1 tracking-wide uppercase">{event.category}</p>
              <CardTitle className="font-headline text-xl">{event.title}</CardTitle>
              <p className="text-sm text-muted-foreground">{event.date}</p>
              <p className="text-sm text-muted-foreground flex items-center">
                <MapPin className="me-1 h-4 w-4" /> {event.location}
              </p>
            </CardHeader>
            <CardContent className="flex-grow">
              <p>{event.description}</p>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href={`/events/${event.id}`}>פרטים והרשמה</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
