"use client"

import type React from "react"

import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import AnimatedInput from "./animated-input"
import ValidationFeedback from "./validation-feedback"
import { Button } from "@/components/ui/button"
import {
  validateFirstName,
  validateLastName,
  validateUsername,
  validateEmail,
  // validatePassword,
  validateConfirmPassword,
  validatePasswordWithStrength,
  PasswordStrength,
} from "@/lib/validation"

interface SignUpFormProps {
  onToggle: () => void
}

interface FormData {
  firstName: string
  lastName: string
  username: string
  email: string
  password: string
  confirmPassword: string
}

interface ValidationErrors {
  [key: string]: string | null
}

export default function SignUpForm({ onToggle }: SignUpFormProps) {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [errors, setErrors] = useState<ValidationErrors>({})
  const [passwordStrength, setPasswordStrength] = useState<PasswordStrength | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const isFormValid = Object.values(formData).every((val) => val) && !Object.values(errors).some((err) => err)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Update password strength dynamically
    if (name === "password") {
      const { strength } = validatePasswordWithStrength(value)
      setPasswordStrength(strength)
    }
  }


  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    let error: string | null = null

    switch (name) {
      case "firstName":
        error = validateFirstName(value)
        break
      case "lastName":
        error = validateLastName(value)
        break
      case "username":
        error = validateUsername(value)
        break
      case "email":
        error = validateEmail(value)
        break
      case "password":
        if (name === "password") {
          const result = validatePasswordWithStrength(value)
          error = result.error
          setPasswordStrength(result.strength) // ensure strength is updated on blur too
        }
        break
      case "confirmPassword":
        error = validateConfirmPassword(value, formData.password)
        break
    }

    setErrors((prev) => ({ ...prev, [name]: error }))
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
        <h1 className="text-balance text-3xl font-bold text-foreground mb-2">Create Account</h1>
        <p className="text-sm text-muted-foreground">Join us and start your journey</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Row */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <AnimatedInput
              id="firstName"
              name="firstName"
              type="text"
              label="First Name"
              value={formData.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.firstName && <ValidationFeedback error={errors.firstName} />}
          </div>
          <div>
            <AnimatedInput
              id="lastName"
              name="lastName"
              type="text"
              label="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.lastName && <ValidationFeedback error={errors.lastName} />}
          </div>
        </div>

        {/* Username */}
        <div>
          <AnimatedInput
            id="username"
            name="username"
            type="text"
            label="Username"
            value={formData.username}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.username && <ValidationFeedback error={errors.username} />}
        </div>

        {/* Email */}
        <div>
          <AnimatedInput
            id="email"
            name="email"
            type="email"
            label="Email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.email && <ValidationFeedback error={errors.email} />}
        </div>

        {/* Password */}
        <div className="relative">
          <AnimatedInput
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            label="Password"
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlur}
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
          {/* Always render ValidationFeedback for password */}
          <ValidationFeedback error={errors.password} strength={passwordStrength} />
        </div>

        {/* Confirm Password */}
        <div className="relative">
          <AnimatedInput
            id="confirmPassword"
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            label="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {formData.confirmPassword && (
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label={showConfirmPassword ? "Hide password" : "Show password"}
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          )}
        </div>
        {errors.confirmPassword && <ValidationFeedback error={errors.confirmPassword} />}

        <div className="pt-2">
          <Button type="submit" disabled={!isFormValid || isLoading} className="w-full">
            {isLoading ? "Creating Account..." : "Create Account"}
          </Button>
        </div>
      </form>

      <div className="my-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-border" />
        <span className="text-xs font-medium text-muted-foreground uppercase">OR</span>
        <div className="h-px flex-1 bg-border" />
      </div>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <button onClick={onToggle} className="font-semibold text-primary hover:text-primary/80 transition-colors">
          Sign in
        </button>
      </p>
    </div>
  )
}

