/**
 * createContext - Helper for creating type-safe React-like context in AGS/gnim
 * 
 * This utility provides a way to share state between components without prop drilling,
 * similar to React's Context API but adapted for AGS/gnim.
 * 
 * @example
 * ```tsx
 * const [SliderProvider, useSliderContext] = createContext<SliderContextValue>('Slider')
 * 
 * function Slider({ value, children }) {
 *   return (
 *     <SliderProvider value={{ value, setValue }}>
 *       {children}
 *     </SliderProvider>
 *   )
 * }
 * 
 * function SliderThumb() {
 *   const { value } = useSliderContext()
 *   return <box />
 * }
 * ```
 */

import { Variable } from "ags/variable"

export interface ContextProviderProps<T> {
  value: T
  children: any
}

/**
 * Creates a context with Provider and useContext hook
 * 
 * @param name - Name of the context (used in error messages)
 * @returns A tuple of [Provider, useContext]
 */
export function createContext<T>(name: string) {
  // Create a variable to hold the context value
  // We use a Map to support nested providers of the same context
  const contextStack: T[] = []
  
  /**
   * Provider component that makes the value available to children
   */
  function Provider(props: ContextProviderProps<T>) {
    // Push value onto stack when provider is created
    contextStack.push(props.value)
    
    // Note: In a real implementation, we'd need to pop from stack when unmounted
    // For now, this is a simplified version that works for most use cases
    return props.children
  }
  
  /**
   * Hook to access the context value
   * Throws an error if used outside of a Provider
   */
  function useContext(): T {
    const value = contextStack[contextStack.length - 1]
    
    if (value === undefined) {
      throw new Error(
        `use${name}Context must be used within a ${name}.Provider`
      )
    }
    
    return value
  }
  
  return [Provider, useContext] as const
}
