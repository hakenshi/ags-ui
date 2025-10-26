/**
 * Hooks for reactive access to Astal services
 * 
 * These hooks provide type-safe, reactive access to system services
 * with graceful degradation when services are not available.
 */

export { useBattery } from "./useBattery"
export type { BatteryState } from "./useBattery"

export { useNetwork } from "./useNetwork"
export type { NetworkState, AccessPoint } from "./useNetwork"

export { useAudio } from "./useAudio"
export type { AudioState } from "./useAudio"

export { useHyprland } from "./useHyprland"
export type { HyprlandState, Workspace, Window } from "./useHyprland"

export { useNotifications } from "./useNotifications"
export type { NotificationsState, Notification, NotificationAction } from "./useNotifications"
