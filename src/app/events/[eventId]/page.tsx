import Image from 'next/image';
import SectionTitle from '@/components/shared/SectionTitle';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CalendarDays, MapPin, Users, Tag, Clock, ExternalLink } from 'lucide-react';

// Simulate fetching event data
async function getEventData(eventId: string) {
  // In a real app, you would fetch this from a database or API
  const mockEvents: { [key: string]: any } = {
    "1": { title: "כנס שנתי ליועצי מס 2024", description: "הכנס המרכזי של הלשכה, יכלול הרצאות ממיטב המומחים, סדנאות מעשיות, ופאנלים מרתקים על הנושאים החמים ביותר בעולם המיסוי. זוהי הזדמנות מצוינת להתעדכן, ליצור קשרים מקצועיים ולהנות מחוויה מקצועית וחברתית.", category: "כנסים", date: "20-22 באוגוסט 2024", time: "09:00 - 17:00 (בכל יום)", location: "מלון דן, אילת", imageUrl: "https://placehold.co/800x400.png", imageHint:"conference hall", targetAudience: "יועצי מס, רואי חשבון, עורכי דין, מנהלי כספים", topics: ["עדכוני חקיקה", "מיסוי בינלאומי", "מע\"מ", "מיסוי מקרקעין", "אתיקה מקצועית"], price: "1200 ש\"ח (לחברי לשכה), 1500 ש\"ח (לאחרים)" },
    "2": { title: "סדנת מיסוי בינלאומי מתקדמת", description: "סדנה מעמיקה שתעסוק בסוגיות מורכבות במיסוי בינלאומי, כולל תכנון מס לגיטימי, אמנות למניעת כפל מס, חילופי מידע בין מדינות ועוד. הסדנה מיועדת לבעלי ניסיון בתחום.", category: "סדנאות", date: "5 בספטמבר 2024", time: "10:00 - 16:00", location: "משרדי הלשכה, תל אביב", imageUrl: "https://placehold.co/800x400.png", imageHint:"global business", targetAudience: "יועצי מס ורו\"ח המתמחים במיסוי בינלאומי", topics: ["אמנות מס", "BEPS 2.0", "Transfer Pricing", "רילוקיישן"], price: "800 ש\"ח" },
  };
  return mockEvents[eventId] || null;
}

export default async function EventDetailPage({ params }: { params: { eventId: string } }) {
  const event = await getEventData(params.eventId);

  if (!event) {
    return (
      <div>
        <SectionTitle>אירוע לא נמצא</SectionTitle>
        <p>מצטערים, האירוע שחיפשת אינו זמין.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <SectionTitle>{event.title}</SectionTitle>

      <Card className="overflow-hidden shadow-xl">
        {event.imageUrl && (
          <div className="relative w-full h-64 md:h-96">
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
          <CardTitle className="font-headline text-3xl">{event.title}</CardTitle>
          <CardDescription className="text-lg">{event.category}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6 text-md">
            <div className="space-y-3">
              <p className="flex items-center"><CalendarDays className="me-3 h-5 w-5 text-primary" /> <strong>תאריך:</strong> {event.date}</p>
              <p className="flex items-center"><Clock className="me-3 h-5 w-5 text-primary" /> <strong>שעה:</strong> {event.time}</p>
              <p className="flex items-center"><MapPin className="me-3 h-5 w-5 text-primary" /> <strong>מיקום:</strong> {event.location}</p>
            </div>
            <div className="space-y-3">
              <p className="flex items-center"><Users className="me-3 h-5 w-5 text-primary" /> <strong>קהל יעד:</strong> {event.targetAudience}</p>
              <p className="flex items-center"><Tag className="me-3 h-5 w-5 text-primary" /> <strong>מחיר:</strong> {event.price}</p>
            </div>
          </div>

          <div>
            <h3 className="font-headline text-xl font-semibold mb-2 text-primary">תיאור האירוע</h3>
            <p className="text-foreground leading-relaxed">{event.description}</p>
          </div>

          {event.topics && event.topics.length > 0 && (
            <div>
              <h3 className="font-headline text-xl font-semibold mb-2 text-primary">נושאים מרכזיים</h3>
              <ul className="list-disc list-inside space-y-1 ps-5">
                {event.topics.map((topic: string, index: number) => (
                  <li key={index}>{topic}</li>
                ))}
              </ul>
            </div>
          )}
          
          <div className="border-t pt-6 text-center">
            <Button size="lg" className="w-full sm:w-auto text-lg px-8 py-3">
              <ExternalLink className="me-2 h-5 w-5" />
              הרשמה ותשלום (מערכת חיצונית)
            </Button>
            <p className="text-sm text-muted-foreground mt-2">ההרשמה מתבצעת דרך מערכת מאובטחת חיצונית.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Generate static paths for pre-rendering if needed, or use SSR.
// For now, this is dynamic.
// export async function generateStaticParams() {
//   // Example: Fetch all event IDs
//   return [{ eventId: '1' }, { eventId: '2' }];
// }
