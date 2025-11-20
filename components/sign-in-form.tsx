"use client"

import type React from "react"

import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import AnimatedInput from "./animated-input"
import { Button } from "@/components/ui/button"

interface SignInFormProps {
  onToggle: () => void
}

export default function SignInForm({ onToggle }: SignInFormProps) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const isFormValid = formData.username && formData.password

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isFormValid) return

    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
  }

  return (
    <div className="animate-fade-in">
      <div className="mb-8 text-center">
        <h1 className="text-balance text-3xl font-bold text-foreground mb-2">Welcome Back</h1>
        <p className="text-sm text-muted-foreground">Sign in to your account to continue</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <AnimatedInput
          id="username"
          name="username"
          type="text"
          label="Username"
          value={formData.username}
          onChange={handleChange}
        />

        <div className="relative">
          <AnimatedInput
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            label="Password"
            value={formData.password}
            onChange={handleChange}
          />
          {formData.password && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          )}
        </div>

        <div className="pt-2">
          <Button type="submit" disabled={!isFormValid || isLoading} className="w-full">
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </div>
      </form>

      <div className="my-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-border" />
        <span className="text-xs font-medium text-muted-foreground uppercase">OR</span>
        <div className="h-px flex-1 bg-border" />
      </div>

      <p className="text-center text-sm text-muted-foreground">
        Don't have an account?{" "}
        <button onClick={onToggle} className="font-semibold text-primary hover:text-primary/80 transition-colors">
          Sign up
        </button>
      </p>
    </div>
  )
}

