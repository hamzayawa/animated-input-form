"use client"

import { useState } from "react"
import SignInForm from "@/components/sign-in-form"
import SignUpForm from "@/components/sign-up-form"

export default function Home() {
  const [isSignUp, setIsSignUp] = useState(false)

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {isSignUp ? (
          <SignUpForm onToggle={() => setIsSignUp(false)} />
        ) : (
          <SignInForm onToggle={() => setIsSignUp(true)} />
        )}
      </div>
    </main>
  )
}

