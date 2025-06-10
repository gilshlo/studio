"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import Link from 'next/link'

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
import { KeyRound, MailCheck, ArrowLeft } from 'lucide-react'; // KeyRound for forgot password
import { toast } from "@/hooks/use-toast"

const formSchema = z.object({
  email: z.string().email({ message: "אנא הזן כתובת אימייל תקינה." }),
})

export default function ForgotPasswordPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  })

  // TODO: Implement actual password reset logic
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    toast({
      title: "בקשת איפוס סיסמה נשלחה",
      description: `אם קיים חשבון המשויך לכתובת ${values.email}, יישלחו אליו הוראות לאיפוס הסיסמה.`,
      action: (
        <Button variant="outline" size="sm" onClick={() => form.reset()}>
          אישור
        </Button>
      )
    })
    // Simulate API call
    // After submission, typically you'd show a success message regardless of whether the email exists for security.
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)] py-12">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <KeyRound className="mx-auto h-12 w-12 text-primary mb-4" />
          <CardTitle className="font-headline text-3xl">שכחת סיסמה?</CardTitle>
          <CardDescription>אל דאגה! הזן את כתובת האימייל שלך ואנו נשלח לך הוראות לאיפוס הסיסמה.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
              <Button type="submit" className="w-full" size="lg">
                <MailCheck className="me-2 h-5 w-5" />
                שלח הוראות לאיפוס סיסמה
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link href="/login" legacyBehavior passHref>
            <Button variant="link" className="text-sm">
              <ArrowLeft className="me-1 h-4 w-4" /> {/* ArrowLeft for RTL back arrow */}
              חזור למסך הכניסה
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
