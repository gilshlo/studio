
"use client"

import React from 'react'; // Added this line
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import SectionTitle from '@/components/shared/SectionTitle';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { HelpCircle, Search, Filter, MessageSquarePlus, Send } from 'lucide-react';
import { toast } from "@/hooks/use-toast"

const faqs = [
  {
    category: "חברות בלשכה",
    question: "כיצד מצטרפים ללשכת יועצי המס?",
    answer: "תהליך ההצטרפות כולל מילוי טופס מקוון, צירוף מסמכים רלוונטיים (כגון תעודת יועץ מס מוסמך) ותשלום דמי חבר שנתיים. ניתן למצוא את כל הפרטים והטפסים בעמוד 'הצטרפות ללשכה' באתר."
  },
  {
    category: "חברות בלשכה",
    question: "מהן ההטבות לחברי הלשכה?",
    answer: "חברי הלשכה נהנים ממגוון רחב של הטבות, כולל גישה למאגרי מידע מקצועיים, הנחות בכנסים והשתלמויות, ביטוח אחריות מקצועית בתנאים מועדפים, נטוורקינג ועוד. פירוט מלא בעמוד 'הטבות לחברים'."
  },
  {
    category: "מקצועי",
    question: "היכן ניתן למצוא עדכוני חקיקה ופסיקה?",
    answer: "עדכוני חקיקה ופסיקה מתפרסמים באופן שוטף בספרייה המקצועית באתר, הזמינה לחברי הלשכה. כמו כן, אנו שולחים עדכונים תקופתיים בדוא\"ל לחברים."
  },
  {
    category: "אתר",
    question: "שכחתי את הסיסמה לאזור האישי, מה עושים?",
    answer: "ניתן לשחזר סיסמה דרך עמוד הכניסה לאזור האישי. לחץ על 'שכחתי סיסמה' ופעל לפי ההוראות. סיסמה חדשה תישלח לכתובת הדוא\"ל הרשומה במערכת."
  },
  {
    category: "מקצועי",
    question: "כיצד ניתן להשתתף בכנסים וימי עיון של הלשכה?",
    answer: "לוח האירועים המלא, כולל פרטים על כנסים, ימי עיון וסדנאות, זמין בעמוד 'אירועים וכנסים' באתר. ההרשמה מתבצעת אונליין דרך המערכת הייעודית לכל אירוע."
  }
];

const questionFormSchema = z.object({
  name: z.string().min(2, "שם חייב להכיל לפחות 2 תווים."),
  email: z.string().email("כתובת אימייל לא תקינה."),
  questionText: z.string().min(10, "שאלה חייבת להכיל לפחות 10 תווים."),
  category: z.string().optional(),
})

export default function FaqPage() {
  const questionForm = useForm<z.infer<typeof questionFormSchema>>({
    resolver: zodResolver(questionFormSchema),
    defaultValues: { name: "", email: "", questionText: "" },
  })

  function onQuestionSubmit(values: z.infer<typeof questionFormSchema>) {
    console.log("New question submitted:", values)
    toast({
      title: "שאלתך נשלחה!",
      description: "תודה על פנייתך. אנו נבחן את השאלה ואם היא רלוונטית, נוסיף אותה למאגר.",
    })
    questionForm.reset();
  }
  
  // TODO: Implement actual search and filter logic
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("all");

  const filteredFaqs = faqs.filter(faq => 
    (faq.question.includes(searchTerm) || faq.answer.includes(searchTerm)) &&
    (selectedCategory === "all" || faq.category === selectedCategory)
  );

  const categories = ["all", ...new Set(faqs.map(faq => faq.category))];


  return (
    <div className="space-y-12">
      <SectionTitle>
        <HelpCircle className="inline-block me-3 w-8 h-8" />
        שאלות ותשובות נפוצות
      </SectionTitle>

      <Card className="p-4 sm:p-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
          <div>
            <label htmlFor="faqSearch" className="block text-sm font-medium text-foreground mb-1">חיפוש שאלה</label>
            <div className="relative">
              <Input 
                type="search" 
                id="faqSearch" 
                placeholder="הקלד מילת חיפוש..." 
                className="ps-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            </div>
          </div>
          <div>
            <label htmlFor="categoryFilter" className="block text-sm font-medium text-foreground mb-1">סינון לפי קטגוריה</label>
            <Select dir="rtl" value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger id="categoryFilter">
                <SelectValue placeholder="בחר קטגוריה" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(cat => (
                  <SelectItem key={cat} value={cat}>{cat === "all" ? "הכל" : cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {filteredFaqs.length > 0 ? (
        <Accordion type="single" collapsible className="w-full space-y-2">
          {filteredFaqs.map((faq, index) => (
            <AccordionItem value={`item-${index}`} key={index} className="bg-card shadow-sm rounded-lg">
              <AccordionTrigger className="p-4 sm:p-6 text-lg font-semibold hover:no-underline text-start">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="p-4 sm:p-6 pt-0 text-base leading-relaxed">
                <p className="border-t pt-4">{faq.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      ) : (
        <p className="text-center text-lg text-muted-foreground py-8">לא נמצאו שאלות התואמות את החיפוש.</p>
      )}

      <Card className="shadow-lg mt-12">
        <CardHeader>
          <CardTitle className="font-headline text-2xl flex items-center">
            <MessageSquarePlus className="me-3 h-7 w-7 text-primary" />
            לא מצאת תשובה? שלח שאלה חדשה
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...questionForm}>
            <form onSubmit={questionForm.handleSubmit(onQuestionSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <FormField control={questionForm.control} name="name" render={({ field }) => (
                    <FormItem>
                      <FormLabel>שם מלא</FormLabel>
                      <FormControl><Input placeholder="שמך" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField control={questionForm.control} name="email" render={({ field }) => (
                    <FormItem>
                      <FormLabel>כתובת אימייל</FormLabel>
                      <FormControl><Input type="email" placeholder="האימייל שלך" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField control={questionForm.control} name="questionText" render={({ field }) => (
                  <FormItem>
                    <FormLabel>שאלתך</FormLabel>
                    <FormControl><Textarea placeholder="כתוב את שאלתך כאן..." rows={4} {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Optional: Add category selection for new questions */}
              <Button type="submit" size="lg">
                <Send className="me-2 h-5 w-5" />
                שלח שאלה
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
