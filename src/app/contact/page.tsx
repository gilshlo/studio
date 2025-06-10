"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import SectionTitle from '@/components/shared/SectionTitle';
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { toast } from "@/hooks/use-toast"

const formSchema = z.object({
  name: z.string().min(2, { message: "שם חייב להכיל לפחות 2 תווים." }),
  email: z.string().email({ message: "כתובת אימייל לא תקינה." }),
  phone: z.string().optional(),
  subject: z.string().min(5, { message: "נושא חייב להכיל לפחות 5 תווים." }),
  message: z.string().min(10, { message: "הודעה חייבת להכיל לפחות 10 תווים." }),
})

export default function ContactPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  })

  // TODO: Implement actual form submission logic
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    toast({
      title: "הפנייה נשלחה בהצלחה!",
      description: "ניצור איתך קשר בהקדם.",
    })
    form.reset(); 
  }

  return (
    <div className="space-y-12">
      <SectionTitle>
        <Mail className="inline-block me-3 w-8 h-8" />
        צור קשר
      </SectionTitle>

      <div className="grid md:grid-cols-2 gap-8">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">פרטי התקשרות</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-lg">
            <p className="flex items-start">
              <MapPin className="me-3 mt-1 h-6 w-6 text-primary shrink-0" />
              <span><strong>כתובת:</strong> רחוב המסגר 1, תל אביב, 6721401</span>
            </p>
            <p className="flex items-center">
              <Phone className="me-3 h-6 w-6 text-primary" />
              <span><strong>טלפון:</strong> <a href="tel:03-1234567" className="hover:underline">03-1234567</a></span>
            </p>
            <p className="flex items-center">
              <Mail className="me-3 h-6 w-6 text-primary" />
              <span><strong>דוא"ל:</strong> <a href="mailto:info@taxchamber.org.il" className="hover:underline">info@taxchamber.org.il</a></span>
            </p>
            <div>
              <h3 className="font-semibold mt-4 mb-2">שעות פעילות המשרד:</h3>
              <p>ימים א'-ה': 09:00 - 17:00</p>
              <p>יום ו' וערבי חג: סגור</p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">טופס פנייה</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>שם מלא</FormLabel>
                      <FormControl>
                        <Input placeholder="הכנס שם מלא" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>כתובת אימייל</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="example@mail.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>טלפון (אופציונלי)</FormLabel>
                      <FormControl>
                        <Input type="tel" placeholder="05X-XXXXXXX" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>נושא הפנייה</FormLabel>
                      <FormControl>
                        <Input placeholder="לדוגמה: שאלה מקצועית, הצטרפות ללשכה" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>תוכן הפנייה</FormLabel>
                      <FormControl>
                        <Textarea placeholder="כתוב את הודעתך כאן..." rows={5} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" size="lg">
                  <Send className="me-2 h-5 w-5" />
                  שלח פנייה
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
      
      {/* Placeholder for Map */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">מפת הגעה</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-muted h-80 flex items-center justify-center rounded-md">
            <p className="text-muted-foreground">מפת הגעה תופיע כאן (לדוגמה: Google Maps)</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
