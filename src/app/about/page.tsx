import Image from 'next/image';
import SectionTitle from '@/components/shared/SectionTitle';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, MapPin } from 'lucide-react';

const chamberRoles = [
  { name: "ישראל ישראלי", role: "נשיא הלשכה", imageUrl: "https://placehold.co/200x200.png", imageHint: "person portrait", description: "מוביל את פעילות הלשכה ומייצג אותה בפני גורמי חוץ. בעל ניסיון רב שנים בתחום המיסוי." },
  { name: "שרה כהן", role: "סגנית נשיא", imageUrl: "https://placehold.co/200x200.png", imageHint: "person portrait", description: "אחראית על הפעילות המקצועית וההכשרות בלשכה. מומחית במיסוי בינלאומי." },
  { name: "משה לוי", role: "גזבר", imageUrl: "https://placehold.co/200x200.png", imageHint: "person portrait", description: "מנהל את ענייני הכספים של הלשכה. יועץ מס ותיק עם התמחות בעסקים קטנים." },
  { name: "רבקה אברהם", role: "יו\"ר ועדת אתיקה", imageUrl: "https://placehold.co/200x200.png", imageHint: "person portrait", description: "אמונה על שמירת הסטנדרטים האתיים של חברי הלשכה. מרצה בכירה לדיני מסים." },
];

const branches = [
  { name: "סניף תל אביב והמרכז", address: "רחוב המסגר 1, תל אביב", contact: "03-1234567" },
  { name: "סניף ירושלים", address: "רחוב יפו 200, ירושלים", contact: "02-9876543" },
  { name: "סניף חיפה והצפון", address: "שדרות העצמאות 50, חיפה", contact: "04-1122334" },
  { name: "סניף באר שבע והדרום", address: "דרך חברון 10, באר שבע", contact: "08-5566778" },
];

export default function AboutPage() {
  return (
    <div className="space-y-12">
      <section>
        <SectionTitle>אודות לשכת יועצי המס בישראל</SectionTitle>
        <Card className="p-6 shadow-lg">
          <CardContent className="text-lg space-y-4">
            <p>לשכת יועצי המס בישראל היא הגוף המקצועי המייצג את יועצי המס המוסמכים בישראל. הלשכה נוסדה בשנת XXXX במטרה לקדם את מקצוע ייעוץ המס, לשמור על רמה מקצועית גבוהה של העוסקים בו, ולפעול למען האינטרסים של חבריה ושל ציבור הנישומים.</p>
            <p>אנו פועלים במגוון מישורים:</p>
            <ul className="list-disc list-inside space-y-2 ps-5">
              <li>ייצוג חברי הלשכה בפני רשויות המס, הכנסת וועדותיה, ובתי המשפט.</li>
              <li>קיום השתלמויות, כנסים וימי עיון מקצועיים להעשרת הידע של החברים.</li>
              <li>פרסום חומר מקצועי, עדכוני חקיקה ופסיקה.</li>
              <li>קביעת כללי אתיקה מקצועית ופיקוח על שמירתם.</li>
              <li>מתן מענה לפניות הציבור בנושאי מיסוי.</li>
              <li>פעילות ציבורית לשיפור מערכת המס בישראל.</li>
            </ul>
            <p>הלשכה מונה כיום אלפי חברים הפרוסים בכל רחבי הארץ ומעניקים שירותי ייעוץ מס למגוון רחב של לקוחות – החל מעצמאים ועסקים קטנים ועד לחברות גדולות ותאגידים בינלאומיים.</p>
            <p>חזון הלשכה הוא להיות הגוף המוביל בישראל בתחום המיסוי, המשפיע על עיצוב מדיניות המס, ומהווה בית מקצועי וערכי לכל יועצי המס בישראל.</p>
          </CardContent>
        </Card>
      </section>

      <section>
        <SectionTitle>
          <User className="inline-block me-3 w-7 h-7" />
          בעלי תפקידים בלשכה
        </SectionTitle>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {chamberRoles.map((person, index) => (
            <Card key={index} className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="items-center">
                <div className="relative w-32 h-32 rounded-full overflow-hidden mx-auto mb-4 border-2 border-accent">
                  <Image src={person.imageUrl} alt={person.name} layout="fill" objectFit="cover" data-ai-hint={person.imageHint} />
                </div>
                <CardTitle className="font-headline text-xl">{person.name}</CardTitle>
                <p className="text-accent font-semibold">{person.role}</p>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{person.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <SectionTitle>
          <MapPin className="inline-block me-3 w-7 h-7" />
          סניפי הלשכה
        </SectionTitle>
        <div className="grid md:grid-cols-2 gap-6">
          {branches.map((branch, index) => (
            <Card key={index} className="shadow-lg">
              <CardHeader>
                <CardTitle className="font-headline text-lg">{branch.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground"><strong>כתובת:</strong> {branch.address}</p>
                <p className="text-foreground"><strong>טלפון:</strong> {branch.contact}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
