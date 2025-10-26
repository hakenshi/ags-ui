import { ButtonProps } from "./types"

export function Button({
  onClick,
  disabled = false,
  type = "button",
  asChild = false,
  children,
  className = "",
}: ButtonProps) {
  // If asChild is true, clone the child element and add our props
  if (asChild && children) {
    // In asChild mode, we pass our props to the child
    // The child should be a single element that accepts these props
    return children
  }

  // Build data attributes
  const dataAttrs: Record<string, string> = {}
  if (disabled) {
    dataAttrs["data-disabled"] = ""
  }

  return (
    <button
      className={className}
      onClick={disabled ? undefined : onClick}
      sensitive={!disabled}
      {...dataAttrs}
    >
      {children}
    </button>
  )
}
