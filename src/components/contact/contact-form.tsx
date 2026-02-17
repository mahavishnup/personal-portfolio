'use client'

import { useActionState } from 'react'
import { submitContactAction } from '@/app/actions/contact'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Loader2, Send } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
// toast implementation would be nice, but simple message for now

export function ContactForm() {
  const initialState = { error: null as string | null, success: false }
  const [state, formAction, isPending] = useActionState(
    submitContactAction,
    initialState
  )

  return (
    <Card className="mx-auto w-full max-w-lg">
      <CardHeader>
        <CardTitle>Send a Message</CardTitle>
        <CardDescription>
          Have a project in mind or just want to say hi? Fill out the form
          below.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {state?.success ? (
          <div className="rounded-md bg-green-500/15 p-4 text-center text-green-600 dark:text-green-400">
            <h3 className="mb-1 font-semibold">Message Sent!</h3>
            <p className="text-sm">
              Thanks for reaching out. I&apos;ll get back to you soon.
            </p>
            <Button
              variant="link"
              onClick={() => window.location.reload()}
              className="mt-2"
            >
              Send another message
            </Button>
          </div>
        ) : (
          <form action={formAction} className="space-y-4">
            {/* Honeypot anti-spam field — hidden from humans */}
            <div
              className="absolute -left-[9999px] opacity-0"
              aria-hidden="true"
            >
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" placeholder="Your Name" required />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="your@email.com"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                name="message"
                placeholder="Tell me about your project..."
                rows={5}
                required
              />
            </div>

            {state?.error && (
              <p className="text-destructive text-sm font-medium">
                {state.error}
              </p>
            )}

            <Button className="w-full" type="submit" disabled={isPending}>
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Send Message
                </>
              )}
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  )
}
