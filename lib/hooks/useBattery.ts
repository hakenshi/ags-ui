/**
 * useBattery - Hook for reactive battery information
 * 
 * Provides reactive access to battery status including percentage, charging state,
 * and time remaining. Includes graceful degradation when battery is not available.
 * 
 * @example
 * ```tsx
 * const battery = useBattery()
 * 
 * <box>
 *   {battery.available && (
 *     <>
 *       <icon name={battery.charging ? "battery-charging" : "battery"} />
 *       <label label={`${battery.percentage}%`} />
 *       {battery.timeRemaining && (
 *         <label label={formatTime(battery.timeRemaining)} />
 *       )}
 *     </>
 *   )}
 * </box>
 * ```
 */

import AstalBattery from "gi://AstalBattery?version=0.1"
import { createReactiveBinding } from "../primitives/createBinding"

export interface BatteryState {
  /** Battery percentage (0-100) */
  percentage: number
  /** Whether battery is currently charging */
  charging: boolean
  /** Time remaining in seconds (null if not available) */
  timeRemaining: number | null
  /** Whether battery is available on this system */
  available: boolean
}

/**
 * Hook to access battery information reactively
 * 
 * @returns BatteryState object with reactive battery information
 */
export function useBattery(): BatteryState {
  try {
    const battery = AstalBattery.get_default()
    
    // Check if battery is actually available
    if (!battery) {
      return getDefaultBatteryState()
    }
    
    // Create reactive bindings for battery properties
    const percentage = createReactiveBinding(battery, "percentage")
    const charging = createReactiveBinding(battery, "charging")
    
    // Calculate time remaining based on charging state
    // Use timeToFull when charging, timeToEmpty when discharging
    const timeToEmpty = createReactiveBinding(battery, "timeToEmpty")
    const timeToFull = createReactiveBinding(battery, "timeToFull")
    const timeRemaining = charging ? timeToFull : timeToEmpty
    
    return {
      percentage,
      charging,
      timeRemaining: timeRemaining > 0 ? timeRemaining : null,
      available: true,
    }
  } catch (error) {
    // Graceful degradation when AstalBattery is not available
    console.warn("AstalBattery not available:", error)
    return getDefaultBatteryState()
  }
}

/**
 * Returns default battery state when service is unavailable
 */
function getDefaultBatteryState(): BatteryState {
  return {
    percentage: 0,
    charging: false,
    timeRemaining: null,
    available: false,
  }
}
