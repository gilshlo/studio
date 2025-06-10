import Image from 'next/image';
import Link from 'next/link';
import SectionTitle from '@/components/shared/SectionTitle';
import PlaceholderCard from '@/components/shared/PlaceholderCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { PlayCircle, Newspaper, CalendarDays, Info, ExternalLink, Rss } from 'lucide-react';

export default function Home() {
  const publications = [
    { title: "עדכון חקיקה מס הכנסה", description: "סיכום השינויים האחרונים בחוקי מס הכנסה והשפעתם על יועצי המס.", category: "מס הכנסה", date: "15.07.2024" },
    { title: "מדריך מע\"מ לעסקים קטנים", description: "כל מה שצריך לדעת על התנהלות נכונה מול רשויות המע\"מ.", category: "מע\"מ", date: "10.07.2024" },
    { title: "פסיקה חדשה במיסוי מקרקעין", description: "ניתוח פסק דין משמעותי והשלכותיו על עסקאות נדל\"ן.", category: "מיסוי מקרקעין", date: "05.07.2024" },
  ];

  const events = [
    { title: "כנס שנתי ליועצי מס", description: "הכנס המרכזי של הלשכה עם מיטב המרצים והחידושים בתחום.", date: "20-22.08.2024", location: "מלון דן, אילת" },
    { title: "סדנת מיסוי בינלאומי", description: "העמקה בסוגיות מיסוי חוצה גבולות ואמנות מס.", date: "05.09.2024", location: "משרדי הלשכה, תל אביב" },
    { title: "יום עיון מס חברות", description: "דיונים ועדכונים בתחום מס החברות בישראל.", date: "18.09.2024", location: "זום (מקוון)" },
  ];

  return (
    <div className="space-y-12">
      <section className="bg-card p-8 rounded-lg shadow-md">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary mb-4">
              לשכת יועצי המס בישראל
            </h1>
            <p className="text-lg text-foreground mb-6">
              הארגון המקצועי המוביל המייצג את יועצי המס והיועצות הפיננסיות בישראל. אנו פועלים לקידום מעמד המקצוע, מתן כלים מקצועיים לחברים, וייצוגם בפני רשויות המדינה.
            </p>
            <div className="flex gap-3">
              <Button asChild size="lg">
                <Link href="/about">קראו עוד עלינו</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/member-registration">הצטרפות ללשכה</Link>
              </Button>
            </div>
          </div>
          <div className="relative h-64 md:h-80 w-full rounded-lg overflow-hidden shadow-lg">
            <Image 
              src="https://placehold.co/600x400.png" 
              alt="Tax professionals meeting" 
              layout="fill" 
              objectFit="cover"
              data-ai-hint="professionals meeting" 
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <PlayCircle className="w-16 h-16 text-white/80 hover:text-white transition-colors cursor-pointer" />
            </div>
            <div className="absolute bottom-0 start-0 p-4 bg-gradient-to-t from-black/50 to-transparent w-full">
              <h3 className="text-white font-semibold text-lg">צפו: דבר נשיא הלשכה</h3>
            </div>
          </div>
        </div>
      </section>

      <section>
        <SectionTitle>
          <Newspaper className="inline-block me-3 w-7 h-7" />
          פרסומים אחרונים
        </SectionTitle>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {publications.map((pub, index) => (
            <PlaceholderCard 
              key={index} 
              title={pub.title} 
              description={pub.description} 
              linkUrl="#" 
              category={pub.category}
              date={pub.date}
              imageUrl={`https://placehold.co/400x250.png?random=${index}`}
              imageHint="document abstract"
            />
          ))}
        </div>
        <div className="mt-6 text-center">
          <Button variant="outline" asChild>
            <Link href="/content-library">לכל הפרסומים <Rss className="ms-2 h-4 w-4" /></Link>
          </Button>
        </div>
      </section>

      <section>
        <SectionTitle>
          <CalendarDays className="inline-block me-3 w-7 h-7" />
          אירועים קרובים
        </SectionTitle>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, index) => (
            <Card key={index} className="flex flex-col h-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="font-headline text-xl">{event.title}</CardTitle>
                <p className="text-sm text-muted-foreground">{event.date} | {event.location}</p>
              </CardHeader>
              <CardContent className="flex-grow">
                <p>{event.description}</p>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href={`/events/${index + 1}`}>פרטים והרשמה</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="mt-6 text-center">
          <Button variant="outline" asChild>
            <Link href="/events">לכל האירועים</Link>
          </Button>
        </div>
      </section>

      <section>
        <SectionTitle>
          <Info className="inline-block me-3 w-7 h-7" />
          על הלשכה
        </SectionTitle>
        <div className="bg-card p-6 rounded-lg shadow-sm">
          <p className="mb-4">
            לשכת יועצי המס בישראל היא הגוף המייצג הרשמי של יועצי המס בישראל. הלשכה פועלת לקידום מעמדם המקצועי של חבריה, להענקת ידע וכלים מקצועיים, ולייצוגם מול רשויות המס וגופים ציבוריים אחרים. אנו מחויבים לסטנדרטים הגבוהים ביותר של מקצועיות ואתיקה.
          </p>
          <Button asChild>
            <Link href="/about">קראו עוד</Link>
          </Button>
        </div>
      </section>
      
      <section>
        <SectionTitle>
          <ExternalLink className="inline-block me-3 w-7 h-7" />
          קישורים שימושיים
        </SectionTitle>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {[
            {name: "רשות המסים", href: "#"},
            {name: "ביטוח לאומי", href: "#"},
            {name: "משרד האוצר", href: "#"},
            {name: "הספר הירוק", href: "#"}
          ].map(link => (
            <Link key={link.name} href={link.href} target="_blank" rel="noopener noreferrer" className="block p-4 bg-card rounded-lg shadow-sm hover:bg-accent/10 hover:shadow-md transition-all">
              <p className="font-semibold text-primary">{link.name}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
