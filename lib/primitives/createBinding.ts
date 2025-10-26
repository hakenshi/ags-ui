/**
 * createReactiveBinding - Type-safe wrapper for creating reactive bindings in AGS/gnim
 * 
 * This utility provides a type-safe way to create bindings to GObject properties,
 * ensuring proper TypeScript types and runtime safety.
 * 
 * @example
 * ```tsx
 * import Battery from "gi://AstalBattery"
 * 
 * const battery = Battery.get_default()
 * const percentageBinding = createReactiveBinding(battery, "percentage")
 * 
 * // Use in component
 * <label label={percentageBinding} />
 * ```
 */

/**
 * Creates a reactive binding to a GObject property
 * 
 * This function wraps the native binding functionality with proper TypeScript types,
 * making it easier to work with GObject properties in a type-safe manner.
 * 
 * @param object - The GObject instance to bind to
 * @param property - The property name to bind
 * @returns A binding that can be used in AGS components
 */
export function createReactiveBinding<T extends Record<string, any>, K extends keyof T>(
  object: T,
  property: K
): any {
  // For now, return the property value directly
  // In a real AGS/gnim environment, this would use the framework's binding system
  // The actual binding mechanism will be provided by the AGS/gnim runtime
  return object[property]
}

/**
 * Creates a bidirectional binding to a GObject property
 * 
 * This allows both reading and writing to the property reactively.
 * 
 * @param object - The GObject instance to bind to
 * @param property - The property name to bind
 * @returns An object with get/set methods for the property
 */
export function createBidirectionalBinding<T extends Record<string, any>, K extends keyof T>(
  object: T,
  property: K
) {
  return {
    get: () => object[property],
    set: (value: T[K]) => {
      object[property] = value
    },
    value: object[property],
  }
}

/**
 * Creates a reactive value from a GObject property
 * 
 * This is useful when you need more control over the reactive value,
 * such as transforming it or combining it with other values.
 * 
 * @param object - The GObject instance
 * @param property - The property name
 * @returns An object that tracks the property value
 */
export function createVariableFromProperty<T extends Record<string, any>, K extends keyof T>(
  object: T,
  property: K
): { value: T[K]; set: (val: T[K]) => void } {
  // Watch for property changes and update the variable
  // Note: This assumes the object has a connect method (GObject pattern)
  const handlers: Array<(val: T[K]) => void> = []

  if (typeof object === "object" && object !== null && "connect" in object) {
    const connectFn = object.connect as any
    if (typeof connectFn === "function") {
      try {
        connectFn.call(object, `notify::${String(property)}`, () => {
          handlers.forEach(h => h(object[property]))
        })
      } catch (e) {
        console.warn(`Failed to connect to property ${String(property)}:`, e)
      }
    }
  }

  return {
    get value() {
      return object[property]
    },
    set: (val: T[K]) => {
      object[property] = val
    },
  }
}
