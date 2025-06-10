import SectionTitle from '@/components/shared/SectionTitle';
import PlaceholderCard from '@/components/shared/PlaceholderCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BookOpenCheck, Search, Filter, ArrowDownUp, ShieldAlert } from 'lucide-react'; // ShieldAlert for restricted access

// This is a conceptual check. Actual auth logic would be more complex.
const isAuthenticated = false; 

const libraryItems = [
  { title: "מדריך לתכנון מס 2024", description: "הנחיות וטיפים לתכנון מס אופטימלי לשנת המס הנוכחית.", category: "תכנון מס", date: "01.07.2024", type: "מדריך", imageUrl: "https://placehold.co/400x250.png", imageHint:"document graph" },
  { title: "ניתוח פסיקה חדשה במע\"מ", description: "סקירה מעמיקה של פסק דין חשוב והשפעתו על חובות דיווח מע\"מ.", category: "מע\"מ", date: "25.06.2024", type: "ניתוח פסיקה", imageUrl: "https://placehold.co/400x250.png", imageHint:"legal books" },
  { title: "וידאו: שינויים בחוק עידוד השקעות הון", description: "הקלטת וובינר המסביר את התיקונים האחרונים לחוק.", category: "חקיקה", date: "15.06.2024", type: "וידאו", imageUrl: "https://placehold.co/400x250.png", imageHint:"video play button" },
  { title: "טפסים ונהלים מעודכנים", description: "ריכוז טפסים רלוונטיים ונהלי עבודה מעודכנים מול רשות המסים.", category: "טפסים", date: "10.06.2024", type: "מאגר", imageUrl: "https://placehold.co/400x250.png", imageHint:"forms document" },
  { title: "מיסוי בינלאומי: אמנת המס עם ארה\"ב", description: "מדריך מקיף להבנת אמנת המס בין ישראל לארה\"ב.", category: "מיסוי בינלאומי", date: "01.06.2024", type: "מדריך", imageUrl: "https://placehold.co/400x250.png", imageHint:"world map" },
  { title: "מאמר: השפעת בינה מלאכותית על ייעוץ מס", description: "דיון על האתגרים וההזדמנויות שמציבה AI למקצוע.", category: "מאמרים", date: "20.05.2024", type: "מאמר", imageUrl: "https://placehold.co/400x250.png", imageHint:"artificial intelligence" },
];

export default function ContentLibraryPage() {
  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <ShieldAlert className="w-16 h-16 text-destructive mb-4" />
        <h1 className="font-headline text-3xl text-destructive mb-2">גישה מוגבלת</h1>
        <p className="text-lg mb-4">הספרייה המקצועית זמינה לחברי הלשכה בלבד.</p>
        <div className="flex gap-4">
          <Button asChild>
            <a href="/login">כניסה לחברים</a>
          </Button>
          <Button variant="outline" asChild>
            <a href="/member-registration">הצטרפות ללשכה</a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <SectionTitle>
        <BookOpenCheck className="inline-block me-3 w-8 h-8" />
        ספרייה מקצועית
      </SectionTitle>

      <div className="bg-card p-4 sm:p-6 rounded-lg shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
          <div className="lg:col-span-2">
            <label htmlFor="search" className="block text-sm font-medium text-foreground mb-1">חיפוש</label>
            <div className="relative">
              <Input type="search" id="search" placeholder="חפש לפי כותרת, תיאור, מילות מפתח..." className="ps-10" />
              <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            </div>
          </div>
          <div>
            <label htmlFor="categoryFilter" className="block text-sm font-medium text-foreground mb-1">סינון לפי קטגוריה</label>
            <Select dir="rtl">
              <SelectTrigger id="categoryFilter">
                <SelectValue placeholder="בחר קטגוריה" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">הכל</SelectItem>
                <SelectItem value="tax-planning">תכנון מס</SelectItem>
                <SelectItem value="vat">מע"מ</SelectItem>
                <SelectItem value="legislation">חקיקה</SelectItem>
                <SelectItem value="forms">טפסים</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label htmlFor="sortBy" className="block text-sm font-medium text-foreground mb-1">מיון לפי</label>
            <Select dir="rtl">
              <SelectTrigger id="sortBy">
                <SelectValue placeholder="בחר אפשרות מיון" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">החדש ביותר</SelectItem>
                <SelectItem value="oldest">הישן ביותר</SelectItem>
                <SelectItem value="title">כותרת (א-ת)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {libraryItems.map((item, index) => (
          <PlaceholderCard 
            key={index}
            title={item.title}
            description={item.description}
            imageUrl={`${item.imageUrl}?idx=${index}`}
            imageHint={item.imageHint}
            linkUrl="#"
            linkText={item.type === "וידאו" ? "צפה בוידאו" : "קרא עוד"}
            category={item.category}
            date={item.date}
          />
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <Button variant="outline">
          <ArrowDownUp className="me-2 h-4 w-4" />
          טען עוד פריטים
        </Button>
      </div>
    </div>
  );
}
