import Link from 'next/link';
import SectionTitle from '@/components/shared/SectionTitle';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { UserPlus, FileText, CheckCircle, ExternalLink } from 'lucide-react';

export default function MemberRegistrationPage() {
  return (
    <div className="space-y-12">
      <SectionTitle>
        <UserPlus className="inline-block me-3 w-8 h-8" />
        הצטרפות ללשכת יועצי המס
      </SectionTitle>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">ברוכים הבאים למשפחת יועצי המס בישראל!</CardTitle>
          <CardDescription className="text-lg">
            אנו שמחים על התעניינותך להצטרף ללשכת יועצי המס בישראל, הארגון המקצועי המוביל של יועצי המס בארץ.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="font-headline text-xl font-semibold mb-2 text-primary">מדוע כדאי להצטרף?</h3>
            <ul className="list-disc list-inside space-y-2 ps-5 text-foreground">
              <li><strong>ייצוג מקצועי:</strong> הלשכה פועלת לקידום מעמד יועצי המס וייצוגם בפני רשויות המדינה.</li>
              <li><strong>פיתוח מקצועי:</strong> גישה להשתלמויות, כנסים, ימי עיון וחומרים מקצועיים עדכניים.</li>
              <li><strong>קהילה ותמיכה:</strong> הזדמנויות נטוורקינג, קשר עם עמיתים וקבלת תמיכה מקצועית.</li>
              <li><strong>הטבות בלעדיות:</strong> הנחות בביטוח אחריות מקצועית, תוכנות, ספרות ועוד.</li>
              <li><strong>עדכונים שוטפים:</strong> קבלת מידע על שינויי חקיקה, פסיקה והנחיות מקצועיות.</li>
            </ul>
          </div>

          <div>
            <h3 className="font-headline text-xl font-semibold mb-2 text-primary">תהליך ההצטרפות</h3>
            <ol className="list-decimal list-inside space-y-3 ps-5 text-foreground">
              <li>
                <strong>מילוי טופס בקשה:</strong> יש למלא את טופס הבקשה המקוון במערכת החיצונית.
                <div className="flex items-center text-sm text-muted-foreground mt-1">
                  <FileText className="me-1 h-4 w-4" />
                  הטופס כולל פרטים אישיים, פרטי השכלה והסמכה.
                </div>
              </li>
              <li>
                <strong>צירוף מסמכים:</strong> יש לצרף לטופס העתקים של תעודת יועץ מס מוסמך, תעודת זהות, ותמונת פספורט.
              </li>
              <li>
                <strong>בדיקה ואישור:</strong> בקשתך תיבדק על ידי ועדת החברות של הלשכה.
                <div className="flex items-center text-sm text-muted-foreground mt-1">
                  <CheckCircle className="me-1 h-4 w-4" />
                  תהליך האישור עשוי לקחת מספר ימי עסקים.
                </div>
              </li>
              <li>
                <strong>תשלום דמי חבר:</strong> לאחר אישור הבקשה, תקבל הנחיות לתשלום דמי החבר השנתיים.
              </li>
              <li>
                <strong>קבלת גישה:</strong> עם השלמת התשלום, תקבל גישה מלאה לאזור האישי, למאגרי המידע ולהטבות החברים.
              </li>
            </ol>
          </div>

          <div className="border-t pt-6 text-center">
            <h3 className="font-headline text-xl font-semibold mb-4 text-primary">מוכנים להתחיל?</h3>
            <p className="mb-4 text-lg">תהליך הרישום והתשלום מתבצע דרך מערכת חיצונית מאובטחת.</p>
            <Button size="lg" asChild className="text-lg px-8 py-3">
              <a href="#" target="_blank" rel="noopener noreferrer"> {/* Replace # with actual external system URL */}
                <ExternalLink className="me-2 h-5 w-5" />
                למערכת הרישום והתשלום
              </a>
            </Button>
            <p className="text-sm text-muted-foreground mt-3">
              לאחר השלמת הרישום והתשלום, תקבלו אימייל עם פרטי גישה לאזור האישי באתר.
            </p>
          </div>
          
          <div className="mt-8">
            <h4 className="font-headline text-lg font-semibold mb-2">שאלות נוספות?</h4>
            <p className="text-foreground">
              אם יש לך שאלות נוספות בנוגע לתהליך ההצטרפות, ניתן לפנות למחלקת החברים שלנו דרך <Link href="/contact" className="text-primary hover:underline font-semibold">עמוד צור קשר</Link>.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
