import Link from 'next/link';
import SectionTitle from '@/components/shared/SectionTitle';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Award, ShieldCheck, BookOpen, Users, Percent, Gift, LogIn } from 'lucide-react';
import Image from 'next/image';

// This is a conceptual check. Actual auth logic would be more complex.
const isAuthenticated = false; 

const benefits = [
  { icon: ShieldCheck, title: "ביטוח אחריות מקצועית", description: "תנאים מועדפים בביטוח אחריות מקצועית ייעודי ליועצי מס." },
  { icon: BookOpen, title: "גישה למאגרי מידע", description: "גישה לספרייה מקצועית עשירה, מאמרי עומק ועדכוני חקיקה ופסיקה." },
  { icon: Users, title: "נטוורקינג וקהילה", description: "השתתפות בכנסים, ימי עיון וקבוצות דיון מקצועיות עם עמיתים למקצוע." },
  { icon: Percent, title: "הנחות והטבות מסחריות", description: "מגוון הנחות על מוצרים ושירותים רלוונטיים, כולל תוכנות, ספרות מקצועית ועוד." },
  { icon: Gift, title: "ייעוץ משפטי ראשוני", description: "שירות ייעוץ משפטי ראשוני ללא עלות בנושאים הקשורים לעיסוק המקצועי." },
  { icon: Award, title: "תוכניות הכשרה והסמכה", description: "גישה לקורסים מתקדמים ותוכניות הסמכה במחירים מוזלים לחברים." },
];

const sponsors = [
  { name: "בנק המסמרטוטים", logoUrl: "https://placehold.co/150x80.png?text=Bank+Logo", imageHint:"bank logo" },
  { name: "חברת תוכנה בע\"מ", logoUrl: "https://placehold.co/150x80.png?text=Software+Co", imageHint:"software company" },
  { name: "הוצאה לאור מקצועית", logoUrl: "https://placehold.co/150x80.png?text=Publishing+House", imageHint:"publisher logo" },
  { name: "ספק שירותי ענן", logoUrl: "https://placehold.co/150x80.png?text=Cloud+Services", imageHint:"cloud service" },
];

export default function MemberBenefitsPage() {
  return (
    <div className="space-y-12">
      <SectionTitle>
        <Award className="inline-block me-3 w-8 h-8" />
        הטבות לחברי הלשכה
      </SectionTitle>

      {!isAuthenticated && (
        <Card className="bg-primary/5 border-primary/20 p-6 text-center shadow-lg">
          <CardHeader>
            <LogIn className="mx-auto h-12 w-12 text-primary mb-4" />
            <CardTitle className="font-headline text-2xl text-primary">גישה להטבות שמורות לחברים</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg mb-6">חלק מההטבות והמידע המפורט זמינים לחברי לשכה רשומים בלבד. <br/>הצטרפו אלינו או התחברו לחשבונכם כדי ליהנות מכל היתרונות.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/login">כניסה לחברים</Link>
              </Button>
              <Button variant="outline" asChild size="lg">
                <Link href="/member-registration">הצטרפות ללשכה</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {benefits.map((benefit, index) => (
          <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center space-x-0 space-s-4"> {/* Adjusted for RTL */}
              <benefit.icon className="h-10 w-10 text-accent" />
              <CardTitle className="font-headline text-xl">{benefit.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground">{benefit.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <section>
        <SectionTitle>נותני החסות שלנו</SectionTitle>
        <Card className="p-6 shadow-sm">
          <CardContent>
            <p className="text-center text-lg mb-6">אנו מודים לנותני החסות התומכים בפעילות הלשכה ומאפשרים לנו להעניק הטבות נוספות לחברינו.</p>
            <div className="flex flex-wrap justify-center items-center gap-8">
              {sponsors.map((sponsor, index) => (
                <div key={index} className="grayscale hover:grayscale-0 transition-all duration-300">
                  <Image src={sponsor.logoUrl} alt={sponsor.name} width={150} height={80} objectFit="contain" data-ai-hint={sponsor.imageHint}/>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
