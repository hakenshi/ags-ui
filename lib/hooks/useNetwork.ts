/**
 * useNetwork - Hook for reactive network information
 * 
 * Provides reactive access to network status including WiFi and wired connections,
 * signal strength, and available access points.
 * 
 * @example
 * ```tsx
 * const network = useNetwork()
 * 
 * <box>
 *   {network.wifi.enabled && (
 *     <>
 *       <icon name={getSignalIcon(network.wifi.strength)} />
 *       <label label={network.wifi.ssid || "Not connected"} />
 *     </>
 *   )}
 *   {network.wired.state === DeviceState.ACTIVATED && (
 *     <icon name="network-wired" />
 *   )}
 * </box>
 * ```
 */

import AstalNetwork from "gi://AstalNetwork?version=0.1"
import { createReactiveBinding } from "../primitives/createBinding"

export interface AccessPoint {
  /** SSID of the access point */
  ssid: string
  /** Signal strength (0-100) */
  strength: number
  /** Whether the network is secured */
  secure: boolean
  /** Whether this is the active connection */
  active: boolean
}

export interface NetworkState {
  wifi: {
    /** Whether WiFi is enabled */
    enabled: boolean
    /** WiFi device state */
    state: any
    /** SSID of connected network (null if not connected) */
    ssid: string | null
    /** Signal strength (0-100) */
    strength: number
    /** List of available access points */
    accessPoints: AccessPoint[]
  }
  wired: {
    /** Wired device state */
    state: any
  }
}

/**
 * Hook to access network information reactively
 * 
 * @returns NetworkState object with reactive network information
 */
export function useNetwork(): NetworkState {
  try {
    const network = AstalNetwork.get_default()
    
    if (!network) {
      return getDefaultNetworkState()
    }
    
    // Get WiFi device
    const wifi = network.wifi
    
    // Get wired device
    const wired = network.wired
    
    // Create reactive bindings for WiFi properties
    const wifiEnabled = wifi ? createReactiveBinding(wifi, "enabled") : false
    const wifiState = wifi ? createReactiveBinding(wifi, "state") : null
    const wifiSsid = wifi ? createReactiveBinding(wifi, "ssid") : null
    const wifiStrength = wifi ? createReactiveBinding(wifi, "strength") : 0
    
    // Get access points list
    const accessPoints: AccessPoint[] =
      wifi?.access_points?.map((ap: any) => ({
        ssid: ap.ssid || "",
        strength: ap.strength || 0,
        secure: ap.flags !== 0,
        active: ap.active || false,
      })) || []
    
    // Create reactive binding for wired connection
    const wiredState = wired ? createReactiveBinding(wired, "state") : null
    
    return {
      wifi: {
        enabled: wifiEnabled,
        state: wifiState,
        ssid: wifiSsid,
        strength: wifiStrength,
        accessPoints,
      },
      wired: {
        state: wiredState,
      },
    }
  } catch (error) {
    // Graceful degradation when AstalNetwork is not available
    console.warn("AstalNetwork not available:", error)
    return getDefaultNetworkState()
  }
}

/**
 * Returns default network state when service is unavailable
 */
function getDefaultNetworkState(): NetworkState {
  return {
    wifi: {
      enabled: false,
      state: null,
      ssid: null,
      strength: 0,
      accessPoints: [],
    },
    wired: {
      state: null,
    },
  }
}
