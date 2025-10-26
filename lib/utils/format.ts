/**
 * Format utilities for AGS Component Library
 * Provides functions for formatting time, bytes, percentages, and durations
 */

/**
 * Format a date/time according to a format string
 * @param date - Date object to format
 * @param format - Format string (default: "HH:mm")
 * @returns Formatted time string
 * 
 * Format tokens:
 * - HH: Hours (24h, zero-padded)
 * - hh: Hours (12h, zero-padded)
 * - mm: Minutes (zero-padded)
 * - ss: Seconds (zero-padded)
 * - DD: Day (zero-padded)
 * - MM: Month (zero-padded)
 * - YYYY: Full year
 * - A: AM/PM
 */
export function formatTime(date: Date, format: string = "HH:mm"): string {
  const hours24 = date.getHours()
  const hours12 = hours24 % 12 || 12
  const minutes = date.getMinutes()
  const seconds = date.getSeconds()
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()
  const ampm = hours24 >= 12 ? "PM" : "AM"

  const pad = (num: number): string => num.toString().padStart(2, "0")

  return format
    .replace("YYYY", year.toString())
    .replace("MM", pad(month))
    .replace("DD", pad(day))
    .replace("HH", pad(hours24))
    .replace("hh", pad(hours12))
    .replace("mm", pad(minutes))
    .replace("ss", pad(seconds))
    .replace("A", ampm)
}

/**
 * Format bytes to human-readable string
 * @param bytes - Number of bytes
 * @param decimals - Number of decimal places (default: 2)
 * @returns Formatted string (e.g., "1.5 MB")
 */
export function formatBytes(bytes: number, decimals: number = 2): string {
  if (bytes === 0) return "0 Bytes"

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]

  const i = Math.floor(Math.log(bytes) / Math.log(k))
  const value = bytes / Math.pow(k, i)

  return `${value.toFixed(dm)} ${sizes[i]}`
}

/**
 * Format a value as a percentage
 * @param value - Current value
 * @param total - Total value (default: 100)
 * @returns Formatted percentage string (e.g., "75%")
 */
export function formatPercentage(value: number, total: number = 100): string {
  const percentage = (value / total) * 100
  return `${Math.round(percentage)}%`
}

/**
 * Format seconds to human-readable duration
 * @param seconds - Number of seconds
 * @returns Formatted duration string (e.g., "1h 30m", "45s")
 */
export function formatDuration(seconds: number): string {
  if (seconds < 0) return "0s"

  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = Math.floor(seconds % 60)

  const parts: string[] = []

  if (hours > 0) {
    parts.push(`${hours}h`)
  }
  if (minutes > 0) {
    parts.push(`${minutes}m`)
  }
  if (secs > 0 || parts.length === 0) {
    parts.push(`${secs}s`)
  }

  return parts.join(" ")
}
