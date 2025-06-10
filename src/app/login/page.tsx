"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import Link from 'next/link'

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
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { LogIn, UserPlus, KeyRound } from 'lucide-react'; // KeyRound for forgot password
import { toast } from "@/hooks/use-toast"

const formSchema = z.object({
  username: z.string().min(3, { message: "שם משתמש חייב להכיל לפחות 3 תווים." }),
  password: z.string().min(6, { message: "סיסמה חייבת להכיל לפחות 6 תווים." }),
})

export default function LoginPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  // TODO: Implement actual login logic
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    toast({
      title: "התחברות...",
      description: "בודק פרטים, נא להמתין.",
    })
    // Simulate API call
    setTimeout(() => {
      // On success:
      // toast({ title: "התחברת בהצלחה!", description: "מועבר לאזור האישי."});
      // router.push('/profile'); 
      // On failure:
      toast({ variant: "destructive", title: "שגיאת התחברות", description: "שם משתמש או סיסמה שגויים."});
    }, 1500);
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)] py-12">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <LogIn className="mx-auto h-12 w-12 text-primary mb-4" />
          <CardTitle className="font-headline text-3xl">כניסה לאזור האישי</CardTitle>
          <CardDescription>הזן את פרטיך כדי להתחבר לחשבונך</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>שם משתמש (או כתובת אימייל)</FormLabel>
                    <FormControl>
                      <Input placeholder="הכנס שם משתמש" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>סיסמה</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="הכנס סיסמה" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center justify-between text-sm">
                <Link href="/forgot-password" className="text-primary hover:underline">
                  <KeyRound className="inline-block me-1 h-4 w-4" />
                  שכחת סיסמה?
                </Link>
              </div>
              <Button type="submit" className="w-full" size="lg">
                התחבר
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col items-center space-y-4">
          <p className="text-sm text-muted-foreground">
            עדיין אין לך חשבון?{' '}
            <Link href="/member-registration" className="font-semibold text-primary hover:underline">
              <UserPlus className="inline-block me-1 h-4 w-4" />
              הצטרף ללשכה
            </Link>
          </p>
          <p className="text-sm text-muted-foreground">
            צריך לחדש חברות?{' '}
            <Link href="/membership-renewal" className="font-semibold text-primary hover:underline">
              לחץ כאן לחידוש חברות
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
