"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import Image from 'next/image';
import Link from 'next/link';

import SectionTitle from '@/components/shared/SectionTitle';
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { UserCircle, Edit3, ShieldAlert, UploadCloud, Tag } from 'lucide-react';
import { toast } from "@/hooks/use-toast"

// This is a conceptual check. Actual auth logic would be more complex.
const isAuthenticated = false; 

const profileFormSchema = z.object({
  fullName: z.string().min(2, "נדרש שם מלא"),
  email: z.string().email("אימייל לא תקין"),
  phone: z.string().optional(),
  officeAddress: z.string().optional(),
  bio: z.string().max(500, "תיאור קצר יכול להכיל עד 500 תווים").optional(),
  areasOfExpertise: z.array(z.string()).optional(), // Will be handled by checkboxes or multi-select
  profilePictureUrl: z.string().url().optional(),
  logoUrl: z.string().url().optional(),
  showInDirectory: z.boolean().default(true).optional(),
})

// Mock data for current user - in real app this would come from auth context / API
const currentUserData = {
  fullName: "ישראל ישראלי",
  email: "israel@example.com",
  phone: "050-1234567",
  officeAddress: "רחוב הנשיא 1, ירושלים",
  bio: "יועץ מס מוסמך עם 10 שנות ניסיון, מתמחה במיסוי חברות ועסקים קטנים. בעל תואר שני במיסים מאוניברסיטת תל אביב. מאמין בשירות אישי ומקצועי לכל לקוח.",
  areasOfExpertise: ["מיסוי חברות", "מע\"מ"],
  profilePictureUrl: "https://placehold.co/150x150.png",
  imageHint: "profile picture",
  logoUrl: "https://placehold.co/200x100.png?text=MyLogo",
  logoHint: "company logo",
  showInDirectory: true,
};

const allAreasOfExpertise = [
  { id: "income-tax", label: "מס הכנסה" },
  { id: "vat", label: "מע\"מ" },
  { id: "international-tax", label: "מיסוי בינלאומי" },
  { id: "real-estate-tax", label: "מיסוי מקרקעין" },
  { id: "corporate-tax", label: "מיסוי חברות" },
  { id: "tax-planning", label: "תכנון מס" },
];


export default function ProfilePage() {
  const form = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: isAuthenticated ? currentUserData : {
      fullName: "",
      email: "",
      areasOfExpertise: [],
      showInDirectory: true,
    },
  })

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <ShieldAlert className="w-16 h-16 text-destructive mb-4" />
        <h1 className="font-headline text-3xl text-destructive mb-2">גישה מוגבלת</h1>
        <p className="text-lg mb-4">עליך להתחבר כדי לצפות ולנהל את הפרופיל האישי שלך.</p>
        <Button asChild>
          <Link href="/login">כניסה / הרשמה</Link>
        </Button>
      </div>
    );
  }
  
  function onSubmit(values: z.infer<typeof profileFormSchema>) {
    console.log(values)
    toast({
      title: "הפרופיל עודכן!",
      description: "השינויים נשמרו בהצלחה.",
    })
  }

  return (
    <div className="space-y-8">
      <SectionTitle>
        <UserCircle className="inline-block me-3 w-8 h-8" />
        ניהול פרופיל אישי
      </SectionTitle>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline text-2xl">פרטים אישיים</CardTitle>
              <CardDescription>עדכן את הפרטים האישיים והמקצועיים שלך.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6 items-center">
                <div className="md:col-span-1 flex flex-col items-center space-y-4">
                  <div className="relative w-36 h-36 rounded-full overflow-hidden border-2 border-accent">
                    <Image src={form.watch("profilePictureUrl") || "https://placehold.co/150x150.png?text=Profile"} alt="Profile Picture" layout="fill" objectFit="cover" data-ai-hint={currentUserData.imageHint}/>
                  </div>
                  <Button type="button" variant="outline" size="sm">
                    <UploadCloud className="me-2 h-4 w-4" /> שנה תמונת פרופיל
                  </Button>
                  {/* Placeholder for actual image upload functionality */}
                  <FormField
                    control={form.control}
                    name="profilePictureUrl"
                    render={({ field }) => (
                      <FormItem className="hidden">
                        <FormControl><Input {...field} /></FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="md:col-span-2 space-y-4">
                  <FormField control={form.control} name="fullName" render={({ field }) => (
                      <FormItem>
                        <FormLabel>שם מלא</FormLabel>
                        <FormControl><Input placeholder="שם פרטי ומשפחה" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField control={form.control} name="email" render={({ field }) => (
                      <FormItem>
                        <FormLabel>כתובת אימייל</FormLabel>
                        <FormControl><Input type="email" placeholder="example@mail.com" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField control={form.control} name="phone" render={({ field }) => (
                      <FormItem>
                        <FormLabel>טלפון</FormLabel>
                        <FormControl><Input type="tel" placeholder="05X-XXXXXXX" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
               <FormField control={form.control} name="officeAddress" render={({ field }) => (
                  <FormItem>
                    <FormLabel>כתובת משרד</FormLabel>
                    <FormControl><Input placeholder="עיר, רחוב, מספר בית" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField control={form.control} name="bio" render={({ field }) => (
                  <FormItem>
                    <FormLabel>אודות (תיאור קצר)</FormLabel>
                    <FormControl><Textarea placeholder="ספר על עצמך, הניסיון וההתמחות שלך..." rows={4} {...field} /></FormControl>
                    <FormDescription>יוצג באינדקס החברים. עד 500 תווים.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline text-2xl">פרטים מקצועיים</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="areasOfExpertise"
                render={() => (
                  <FormItem>
                    <FormLabel className="text-base">תחומי התמחות</FormLabel>
                    <FormDescription>בחר את תחומי ההתמחות העיקריים שלך. אלו יוצגו באינדקס החברים.</FormDescription>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
                    {allAreasOfExpertise.map((item) => (
                      <FormField
                        key={item.id}
                        control={form.control}
                        name="areasOfExpertise"
                        render={({ field }) => {
                          return (
                            <FormItem className="flex flex-row items-start space-x-0 space-s-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(item.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...(field.value || []), item.id])
                                      : field.onChange(
                                          (field.value || []).filter(
                                            (value) => value !== item.id
                                          )
                                        )
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">{item.label}</FormLabel>
                            </FormItem>
                          )
                        }}
                      />
                    ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div>
                <FormLabel>לוגו משרד (אופציונלי)</FormLabel>
                <div className="mt-2 flex items-center gap-4">
                  {form.watch("logoUrl") && <Image src={form.watch("logoUrl")!} alt="Office Logo" width={100} height={50} objectFit="contain" className="border rounded-md p-1" data-ai-hint={currentUserData.logoHint}/>}
                  <Button type="button" variant="outline" size="sm">
                    <UploadCloud className="me-2 h-4 w-4" /> העלה/שנה לוגו
                  </Button>
                </div>
                {/* Placeholder for actual logo upload */}
                <FormField
                  control={form.control}
                  name="logoUrl"
                  render={({ field }) => (
                    <FormItem className="hidden">
                      <FormControl><Input {...field} /></FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="showInDirectory"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">הצגה באינדקס החברים</FormLabel>
                      <FormDescription>
                        אפשר הצגת הפרופיל שלך באינדקס החברים הציבורי.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
          
          <div className="flex justify-end pt-4">
            <Button type="submit" size="lg">
              <Edit3 className="me-2 h-5 w-5" />
              שמור שינויים
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
