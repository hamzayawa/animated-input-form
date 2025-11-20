interface ValidationFeedbackProps {
  error?: string | null
}

export default function ValidationFeedback({ error }: ValidationFeedbackProps) {
  if (!error) return null

  return <p className="mt-1 text-xs font-medium text-destructive animate-slide-down">{error}</p>
}

