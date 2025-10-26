import { JSX } from "astal/gtk3"

export interface ButtonProps {
  onClick?: () => void
  disabled?: boolean
  type?: "button" | "submit" | "reset"
  asChild?: boolean
  children: any
  className?: string
}
