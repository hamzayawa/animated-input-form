# Animated Inputs authentication Form (Next.js)

A sleek, animated input component for React/Next.js with floating labels built from individual letters, paired with a modern sign-in form featuring password visibility toggle. Perfect for adding a polished and interactive user experience to your authentication flows.

---

## Features

- **Animated Floating Labels**  
  Each label is broken down into individual letters with smooth animations when the input is focused or has a value.

- **Password Visibility Toggle**  
  Easily switch between showing and hiding the password with a clean toggle button.

- **Responsive & Accessible**  
  Designed with accessibility in mind, using proper HTML semantics and `aria-labels`.

- **Reusable Components**  
  Components are modular and can be used across multiple forms.

- **Tailwind CSS Support**  
  Styled using Tailwind for modern, responsive design out-of-the-box.

---

## Components

### `AnimatedInput`

A reusable input component with animated floating labels.

**Props:**

| Prop      | Type | Description |
|-----------|------|-------------|
| `id`      | string | Unique identifier for the input. |
| `name`    | string | Name attribute for form handling. |
| `type`    | string | Input type (`text`, `password`, etc.). |
| `label`   | string | Label text displayed as animated letters. |
| `value`   | string | Controlled input value. |
| `onChange`| function | Handler for input value changes. |
| `onBlur`  | function (optional) | Handler for blur events. |

**Usage:**

```tsx
<AnimatedInput
  id="username"
  name="username"
  type="text"
  label="Username"
  value={username}
  onChange={handleChange}
/>

