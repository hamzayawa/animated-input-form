export function validateFirstName(value: string): string | null {
  if (!value || value.trim().length < 1) {
    return "First name is required"
  }
  return null
}

export function validateLastName(value: string): string | null {
  if (!value || value.trim().length < 1) {
    return "Last name is required"
  }
  return null
}

export function validateUsername(value: string): string | null {
  if (!value) {
    return "Username is required"
  }
  if (value.length < 3) {
    return "Username must be at least 3 characters"
  }
  return null
}

export function validateEmail(value: string): string | null {
  if (!value) {
    return "Email is required"
  }
  const emailRegex = /\S+@\S+\.\S+/
  if (!emailRegex.test(value)) {
    return "Please enter a valid email address"
  }
  return null
}

export function validatePassword(value: string): string | null {
  if (!value) {
    return "Password is required"
  }
  if (value.length < 8) {
    return "Password must be at least 8 characters"
  }
  if (!/[a-z]/.test(value)) {
    return "Password must contain a lowercase letter"
  }
  if (!/[A-Z]/.test(value)) {
    return "Password must contain an uppercase letter"
  }
  if (!/[0-9]/.test(value)) {
    return "Password must contain a number"
  }
  if (!/[!@#$%^&*]/.test(value)) {
    return "Password must contain a special character (!@#$%^&*)"
  }
  return null
}

export function validateConfirmPassword(value: string, password: string): string | null {
  if (!value) {
    return "Please confirm your password"
  }
  if (value !== password) {
    return "Passwords do not match"
  }
  return null
}

