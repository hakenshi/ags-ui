/**
 * Throttle utility for AGS Component Library
 * Limits function execution to once per specified time period
 */

/**
 * Creates a throttled function that only invokes func at most once per every limit milliseconds.
 * The throttled function will invoke func on the leading edge and trailing edge of the limit timeout.
 * 
 * @param fn - The function to throttle
 * @param limit - The number of milliseconds to throttle invocations to
 * @returns A throttled version of the function
 * 
 * @example
 * const throttledScroll = throttle((event: Event) => {
 *   console.log('Scroll event:', event)
 * }, 100)
 * 
 * window.addEventListener('scroll', throttledScroll)
 */
export function throttle<T extends (...args: any[]) => any>(
  fn: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false
  let lastArgs: Parameters<T> | null = null
  let lastContext: any = null

  return function (this: any, ...args: Parameters<T>) {
    if (!inThrottle) {
      fn.apply(this, args)
      inThrottle = true

      setTimeout(() => {
        inThrottle = false
        if (lastArgs !== null) {
          fn.apply(lastContext, lastArgs)
          lastArgs = null
          lastContext = null
        }
      }, limit)
    } else {
      lastArgs = args
      lastContext = this
    }
  }
}
