"use client"

import Link from 'next/link';
import SectionTitle from '@/components/shared/SectionTitle';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MessageSquareMore, Send, Inbox, FileText, Paperclip, ShieldAlert, UserCircle, Edit } from 'lucide-react';

// This is a conceptual check. Actual auth logic would be more complex.
const isAuthenticated = false; 

const mockMessages = [
  { id: "1", subject: "שאלה בנוגע למע\"מ על שירותים דיגיטליים", from: "מחלקת מע\"מ", date: "12.07.2024", read: false, snippet: "שלום רב, בהמשך לשאלתך בנוגע לחבות מע\"מ על שירותים דיגיטליים ללקוחות בחו\"ל...", type: "received" },
  { id: "2", subject: "בירור בנושא ניכוי הוצאות רכב", from: "אני", date: "10.07.2024", read: true, snippet: "לכבוד מחלקת מס הכנסה, אשמח לקבל הבהרה לגבי אופן ניכוי הוצאות רכב לעצמאי...", type: "sent" },
  { id: "3", subject: "עדכון פרטי חברות", from: "מזכירות הלשכה", date: "08.07.2024", read: true, snippet: "חבר יקר, אנא ודא שפרטיך האישיים והמקצועיים מעודכנים במערכת...", type: "received" },
];

export default function InquiriesPage() {
  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <ShieldAlert className="w-16 h-16 text-destructive mb-4" />
        <h1 className="font-headline text-3xl text-destructive mb-2">גישה מוגבלת</h1>
        <p className="text-lg mb-4">עליך להתחבר כדי לגשת לאזור הפניות האישיות.</p>
        <Button asChild>
          <Link href="/login">כניסה / הרשמה</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <SectionTitle>
        <MessageSquareMore className="inline-block me-3 w-8 h-8" />
        פניות אישיות
      </SectionTitle>

      <Tabs defaultValue="inbox" className="w-full">
        <TabsList className="grid w-full grid-cols-3 md:w-auto md:inline-flex mb-6">
          <TabsTrigger value="inbox" className="text-base"><Inbox className="me-2 h-5 w-5" /> דואר נכנס</TabsTrigger>
          <TabsTrigger value="sent" className="text-base"><Send className="me-2 h-5 w-5" /> דואר יוצא</TabsTrigger>
          <TabsTrigger value="compose" className="text-base"><Edit className="me-2 h-5 w-5" /> פנייה חדשה</TabsTrigger>
        </TabsList>

        <TabsContent value="inbox">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline text-2xl">דואר נכנס</CardTitle>
              <CardDescription>הודעות שהתקבלו מגורמים רלוונטיים בלשכה.</CardDescription>
            </CardHeader>
            <CardContent>
              {mockMessages.filter(m => m.type === 'received').length > 0 ? (
                <ul className="space-y-3">
                  {mockMessages.filter(m => m.type === 'received').map(msg => (
                    <li key={msg.id} className={`p-4 border rounded-lg hover:bg-muted/50 transition-colors ${!msg.read ? 'border-primary bg-primary/5' : ''}`}>
                      <div className="flex justify-between items-start">
                        <div>
                          <p className={`font-semibold ${!msg.read ? 'text-primary' : ''}`}>{msg.subject}</p>
                          <p className="text-sm text-muted-foreground">מאת: {msg.from} | {msg.date}</p>
                        </div>
                        <Button variant="ghost" size="sm">פתח</Button>
                      </div>
                      <p className="text-sm mt-1 truncate">{msg.snippet}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-center text-muted-foreground py-4">אין הודעות נכנסות.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sent">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline text-2xl">דואר יוצא</CardTitle>
              <CardDescription>הודעות ששלחת לגורמים בלשכה.</CardDescription>
            </CardHeader>
            <CardContent>
              {mockMessages.filter(m => m.type === 'sent').length > 0 ? (
                <ul className="space-y-3">
                  {mockMessages.filter(m => m.type === 'sent').map(msg => (
                    <li key={msg.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold">{msg.subject}</p>
                          <p className="text-sm text-muted-foreground">נשלח: {msg.date}</p>
                        </div>
                        <Button variant="ghost" size="sm">פתח</Button>
                      </div>
                      <p className="text-sm mt-1 truncate">{msg.snippet}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-center text-muted-foreground py-4">לא נשלחו הודעות.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compose">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline text-2xl">יצירת פנייה חדשה</CardTitle>
              <CardDescription>שלח שאלה או פנייה לגורם הרלוונטי בלשכה.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* This would be a form, simplified for now */}
              <div>
                <Label htmlFor="recipient" className="mb-1 block">נמען</Label>
                <Select dir="rtl">
                  <SelectTrigger id="recipient">
                    <SelectValue placeholder="בחר נמען" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="prof-dept">מחלקה מקצועית</SelectItem>
                    <SelectItem value="membership">מחלקת חברים</SelectItem>
                    <SelectItem value="ethics">ועדת אתיקה</SelectItem>
                    <SelectItem value="general">פנייה כללית</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="subject" className="mb-1 block">נושא</Label>
                <Input id="subject" placeholder="נושא הפנייה" />
              </div>
              <div>
                <Label htmlFor="messageBody" className="mb-1 block">תוכן הפנייה</Label>
                <Textarea id="messageBody" placeholder="כתוב את הודעתך כאן..." rows={6} />
              </div>
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <Button type="button" variant="outline">
                  <Paperclip className="me-2 h-4 w-4" /> צרף קובץ
                </Button>
                <Button type="submit" size="lg">
                  <Send className="me-2 h-5 w-5" /> שלח פנייה
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <Card className="mt-8 shadow-sm">
        <CardHeader>
            <CardTitle className="font-headline text-xl flex items-center"><FileText className="me-2 h-5 w-5"/>היסטוריית פניות</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-muted-foreground">כאן תוכל לצפות בארכיון הפניות שלך (תכונה עתידית).</p>
        </CardContent>
      </Card>
    </div>
  );
}

// Helper Label component if not using shadcn FormLabel
const Label = ({ htmlFor, children, className }: { htmlFor: string, children: React.ReactNode, className?: string }) => (
  <label htmlFor={htmlFor} className={`text-sm font-medium text-foreground ${className}`}>
    {children}
  </label>
);
