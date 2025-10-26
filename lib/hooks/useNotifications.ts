/**
 * useNotifications - Hook for reactive notification management
 * 
 * Provides reactive access to system notifications with methods to dismiss
 * individual notifications or clear all notifications.
 * 
 * @example
 * ```tsx
 * const notifications = useNotifications()
 * 
 * <box orientation="vertical">
 *   {notifications.notifications.map(notif => (
 *     <box key={notif.id}>
 *       <image src={notif.icon} />
 *       <box orientation="vertical">
 *         <label label={notif.summary} />
 *         <label label={notif.body} />
 *       </box>
 *       <button onClick={() => notifications.dismiss(notif.id)}>×</button>
 *     </box>
 *   ))}
 *   {notifications.unreadCount > 0 && (
 *     <button onClick={notifications.dismissAll}>
 *       Clear All ({notifications.unreadCount})
 *     </button>
 *   )}
 * </box>
 * ```
 */

import AstalNotifd from "gi://AstalNotifd?version=0.1"
import { createReactiveBinding } from "../primitives/createBinding"

export interface NotificationAction {
  /** Action ID */
  id: string
  /** Action label */
  label: string
}

export interface Notification {
  /** Notification ID */
  id: number
  /** Application name that sent the notification */
  appName: string
  /** Notification summary/title */
  summary: string
  /** Notification body text */
  body: string
  /** Icon name or path */
  icon: string
  /** Available actions */
  actions: NotificationAction[]
  /** Timestamp when notification was received */
  timestamp: Date
}

export interface NotificationsState {
  /** List of active notifications */
  notifications: Notification[]
  /** Number of unread notifications */
  unreadCount: number
  /** Dismiss a notification by ID */
  dismiss: (id: number) => void
  /** Dismiss all notifications */
  dismissAll: () => void
}

/**
 * Hook to access notifications reactively
 * 
 * @returns NotificationsState object with reactive notification information
 */
export function useNotifications(): NotificationsState {
  try {
    const notifd = AstalNotifd.get_default()
    
    if (!notifd) {
      return getDefaultNotificationsState()
    }
    
    // Create reactive binding for notifications list
    const notificationsBinding = createReactiveBinding(notifd, "notifications")
    
    // Map notifications to our interface
    const notifications: Notification[] = (notificationsBinding || []).map(
      (notif: any) => {
        // Parse actions if available
        const actions: NotificationAction[] = (notif.actions || []).map(
          (action: any) => ({
            id: action.id || action,
            label: action.label || action,
          }),
        )
        
        return {
          id: notif.id || 0,
          appName: notif.app_name || notif.appName || "",
          summary: notif.summary || "",
          body: notif.body || "",
          icon: notif.app_icon || notif.appIcon || notif.image || "",
          actions,
          timestamp: notif.time ? new Date(notif.time * 1000) : new Date(),
        }
      },
    )
    
    // Calculate unread count
    const unreadCount = notifications.length
    
    /**
     * Dismiss a notification by ID
     */
    const dismiss = (id: number) => {
      try {
        const notification = notifd.notifications.find((n: any) => n.id === id)
        if (notification && typeof notification.dismiss === "function") {
          notification.dismiss()
        } else if (typeof notifd.close_notification === "function") {
          notifd.close_notification(id)
        }
      } catch (error) {
        console.error(`Failed to dismiss notification ${id}:`, error)
      }
    }
    
    /**
     * Dismiss all notifications
     */
    const dismissAll = () => {
      try {
        // Try to dismiss each notification
        notifications.forEach((notif) => {
          dismiss(notif.id)
        })
      } catch (error) {
        console.error("Failed to dismiss all notifications:", error)
      }
    }
    
    return {
      notifications,
      unreadCount,
      dismiss,
      dismissAll,
    }
  } catch (error) {
    // Graceful degradation when AstalNotifd is not available
    console.warn("AstalNotifd not available:", error)
    return getDefaultNotificationsState()
  }
}

/**
 * Returns default notifications state when service is unavailable
 */
function getDefaultNotificationsState(): NotificationsState {
  return {
    notifications: [],
    unreadCount: 0,
    dismiss: () => {
      console.warn("Notifications service not available")
    },
    dismissAll: () => {
      console.warn("Notifications service not available")
    },
  }
}
