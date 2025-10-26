export interface InputProps {
    value?: string
    defaultValue?: string
    onValueChange?: (value: string) => void
    placeholder?: string
    type?: "text" | "password" | "email" | "number" | "search"
    disabled?: boolean
    required?: boolean
    className?: string
}
