import Link from 'next/link';
import SectionTitle from '@/components/shared/SectionTitle';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { RefreshCw, CalendarCheck2, ExternalLink, ShieldCheck } from 'lucide-react';

export default function MembershipRenewalPage() {
  return (
    <div className="space-y-12">
      <SectionTitle>
        <RefreshCw className="inline-block me-3 w-8 h-8" />
        חידוש חברות בלשכה
      </SectionTitle>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">שמחים לראותך ממשיך איתנו!</CardTitle>
          <CardDescription className="text-lg">
            חידוש החברות בלשכת יועצי המס מאפשר לך להמשיך וליהנות מכלל השירותים, ההטבות והתמיכה המקצועית שהלשכה מציעה.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="font-headline text-xl font-semibold mb-2 text-primary">חשיבות חידוש החברות</h3>
            <ul className="list-disc list-inside space-y-2 ps-5 text-foreground">
              <li><strong>שמירה על רצף הטבות:</strong> המשך גישה לביטוח אחריות מקצועית, מאגרי מידע, הנחות ועוד.</li>
              <li><strong>המשך פיתוח מקצועי:</strong> השתתפות מוזלת בכנסים, השתלמויות וקורסים מקצועיים.</li>
              <li><strong>תמיכה וייצוג:</strong> הלשכה ממשיכה לייצג את ענייניך המקצועיים בפני הרשויות.</li>
              <li><strong>חלק מקהילה:</strong> שמירה על קשר עם עמיתים למקצוע והשתתפות בפעילויות הלשכה.</li>
            </ul>
          </div>

          <div>
            <h3 className="font-headline text-xl font-semibold mb-2 text-primary">תהליך חידוש החברות</h3>
            <p className="text-foreground mb-3">תהליך חידוש החברות פשוט ומהיר ומתבצע דרך מערכת תשלומים חיצונית ומאובטחת:</p>
            <ol className="list-decimal list-inside space-y-3 ps-5 text-foreground">
              <li>
                <strong>גישה למערכת החידוש:</strong> לחץ על הכפתור מטה כדי לעבור למערכת חידוש החברות.
              </li>
              <li>
                <strong>זיהוי:</strong> הזן את מספר החבר שלך או פרטים מזהים אחרים כפי שיידרש במערכת.
              </li>
              <li>
                <strong>בחירת תקופת חידוש:</strong> בחר את תקופת החברות הרצויה (בדרך כלל שנתית).
              </li>
              <li>
                <strong>תשלום מאובטח:</strong> בצע את התשלום באמצעות כרטיס אשראי או אמצעי תשלום אחר הזמין במערכת.
                <div className="flex items-center text-sm text-muted-foreground mt-1">
                  <ShieldCheck className="me-1 h-4 w-4" />
                  התשלום מתבצע במערכת מאובטחת בתקן PCI.
                </div>
              </li>
              <li>
                <strong>אישור וקבלה:</strong> לאחר השלמת התשלום, תקבל אישור וקבלה לדוא"ל. חברותך תתעדכן אוטומטית במערכות הלשכה.
                <div className="flex items-center text-sm text-muted-foreground mt-1">
                  <CalendarCheck2 className="me-1 h-4 w-4" />
                  מומלץ לשמור את אישור התשלום.
                </div>
              </li>
            </ol>
          </div>

          <div className="border-t pt-6 text-center">
            <h3 className="font-headline text-xl font-semibold mb-4 text-primary">מוכן לחדש את חברותך?</h3>
            <Button size="lg" asChild className="text-lg px-8 py-3">
              <a href="#" target="_blank" rel="noopener noreferrer"> {/* Replace # with actual external system URL */}
                <ExternalLink className="me-2 h-5 w-5" />
                למערכת חידוש חברות ותשלום
              </a>
            </Button>
            <p className="text-sm text-muted-foreground mt-3">
              תוקף החברות שלך יתעדכן מיד עם השלמת התשלום.
            </p>
          </div>
          
          <div className="mt-8">
            <h4 className="font-headline text-lg font-semibold mb-2">בעיות או שאלות?</h4>
            <p className="text-foreground">
              במקרה של קשיים בתהליך החידוש או שאלות נוספות, אנא פנה למחלקת החברים דרך <Link href="/contact" className="text-primary hover:underline font-semibold">עמוד צור קשר</Link>.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
