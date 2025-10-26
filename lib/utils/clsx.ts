/**
 * Class composition utility for AGS Component Library
 * Combines multiple class names into a single string, filtering out falsy values
 */

type ClassValue = string | number | boolean | undefined | null | ClassValue[]

/**
 * Combines multiple class names into a single string.
 * Filters out falsy values (false, null, undefined, 0, "").
 * Flattens arrays and handles nested arrays.
 * 
 * @param classes - Class names to combine
 * @returns Combined class string
 * 
 * @example
 * clsx('foo', 'bar') // 'foo bar'
 * clsx('foo', false && 'bar', 'baz') // 'foo baz'
 * clsx('foo', null, undefined, 'bar') // 'foo bar'
 * clsx(['foo', 'bar'], 'baz') // 'foo bar baz'
 * clsx('foo', ['bar', ['baz']]) // 'foo bar baz'
 */
export function clsx(...classes: ClassValue[]): string {
  const result: string[] = []

  for (const cls of classes) {
    if (!cls) continue

    if (typeof cls === "string" || typeof cls === "number") {
      result.push(String(cls))
    } else if (Array.isArray(cls)) {
      const nested = clsx(...cls)
      if (nested) {
        result.push(nested)
      }
    }
  }

  return result.join(" ")
}
