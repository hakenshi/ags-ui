import { useState } from "astal"
import { InputProps } from "./types"

export function Input({
  value,
  defaultValue = "",
  onValueChange,
  placeholder = "",
  type = "text",
  disabled = false,
  required = false,
  className = "",
}: InputProps) {
  // Determine if this is controlled or uncontrolled
  const isControlled = value !== undefined
  
  // Internal state for uncontrolled mode
  const [internalValue, setInternalValue] = useState(defaultValue)
  
  // Use controlled value if provided, otherwise use internal state
  const currentValue = isControlled ? value : internalValue
  
  const handleChange = (newValue: string) => {
    // Update internal state if uncontrolled
    if (!isControlled) {
      setInternalValue(newValue)
    }
    
    // Call the callback if provided
    onValueChange?.(newValue)
  }
  
  // Build data attributes
  const dataAttrs: Record<string, string> = {}
  if (disabled) {
    dataAttrs["data-disabled"] = ""
  }
  
  // Note: data-invalid would be set based on validation logic
  // For now, we just provide the attribute structure
  
  return (
    <entry
      className={className}
      text={currentValue}
      placeholderText={placeholder}
      visibility={type !== "password"}
      sensitive={!disabled}
      onChanged={(self) => handleChange(self.text)}
      {...dataAttrs}
    />
  )
}
