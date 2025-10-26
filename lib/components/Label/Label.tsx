import { LabelProps } from "./types"

export function Label({
  htmlFor,
  children,
  className = "",
}: LabelProps) {
  // In GTK, labels can be associated with widgets using mnemonics
  // The htmlFor prop can be used to set the mnemonic widget if needed
  // For now, we create a simple label component
  
  return (
    <label
      className={className}
      label={typeof children === "string" ? children : undefined}
    >
      {typeof children !== "string" ? children : undefined}
    </label>
  )
}
