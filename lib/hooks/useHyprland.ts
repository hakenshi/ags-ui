/**
 * useHyprland - Hook for reactive Hyprland window manager information
 * 
 * Provides reactive access to Hyprland workspaces, windows, and active states
 * with methods to control workspace focus.
 * 
 * @example
 * ```tsx
 * const hyprland = useHyprland()
 * 
 * <box>
 *   {hyprland.workspaces.map(ws => (
 *     <button 
 *       onClick={() => hyprland.focusWorkspace(ws.id)}
 *       data-active={ws.id === hyprland.activeWorkspace?.id}
 *     >
 *       {ws.id}
 *     </button>
 *   ))}
 * </box>
 * ```
 */

import AstalHyprland from "gi://AstalHyprland?version=0.1"
import { createReactiveBinding } from "../primitives/createBinding"

export interface Workspace {
  /** Workspace ID */
  id: number
  /** Workspace name */
  name: string
  /** Number of windows in workspace */
  windows: number
  /** Monitor the workspace is on */
  monitor: string
}

export interface Window {
  /** Window address (unique identifier) */
  address: string
  /** Window title */
  title: string
  /** Window class/app name */
  class: string
  /** Workspace ID the window is on */
  workspace: number
  /** Monitor the window is on */
  monitor: string
  /** Whether window is fullscreen */
  fullscreen: boolean
  /** Whether window is floating */
  floating: boolean
}

export interface HyprlandState {
  /** List of all workspaces */
  workspaces: Workspace[]
  /** Currently active workspace */
  activeWorkspace: Workspace | null
  /** List of all windows */
  windows: Window[]
  /** Currently active window */
  activeWindow: Window | null
  /** Focus a workspace by ID */
  focusWorkspace: (id: number) => void
}

/**
 * Hook to access Hyprland information reactively
 * 
 * @returns HyprlandState object with reactive Hyprland information
 */
export function useHyprland(): HyprlandState {
  try {
    const hyprland = AstalHyprland.get_default()
    
    if (!hyprland) {
      return getDefaultHyprlandState()
    }
    
    // Create reactive bindings for workspaces
    const workspacesBinding = createReactiveBinding(hyprland, "workspaces")
    const activeWorkspaceBinding = createReactiveBinding(
      hyprland,
      "focused_workspace",
    )
    
    // Create reactive bindings for windows
    const windowsBinding = createReactiveBinding(hyprland, "clients")
    const activeWindowBinding = createReactiveBinding(
      hyprland,
      "focused_client",
    )
    
    // Map workspaces to our interface
    const workspaces: Workspace[] = (workspacesBinding || []).map(
      (ws: any) => ({
        id: ws.id || 0,
        name: ws.name || `${ws.id}`,
        windows: ws.clients?.length || 0,
        monitor: ws.monitor?.name || "",
      }),
    )
    
    // Map active workspace
    const activeWorkspace: Workspace | null = activeWorkspaceBinding
      ? {
          id: activeWorkspaceBinding.id || 0,
          name: activeWorkspaceBinding.name || `${activeWorkspaceBinding.id}`,
          windows: activeWorkspaceBinding.clients?.length || 0,
          monitor: activeWorkspaceBinding.monitor?.name || "",
        }
      : null
    
    // Map windows to our interface
    const windows: Window[] = (windowsBinding || []).map((win: any) => ({
      address: win.address || "",
      title: win.title || "",
      class: win.class || "",
      workspace: win.workspace?.id || 0,
      monitor: win.monitor?.name || "",
      fullscreen: win.fullscreen || false,
      floating: win.floating || false,
    }))
    
    // Map active window
    const activeWindow: Window | null = activeWindowBinding
      ? {
          address: activeWindowBinding.address || "",
          title: activeWindowBinding.title || "",
          class: activeWindowBinding.class || "",
          workspace: activeWindowBinding.workspace?.id || 0,
          monitor: activeWindowBinding.monitor?.name || "",
          fullscreen: activeWindowBinding.fullscreen || false,
          floating: activeWindowBinding.floating || false,
        }
      : null
    
    /**
     * Focus a workspace by ID
     */
    const focusWorkspace = (id: number) => {
      try {
        hyprland.dispatch("workspace", `${id}`)
      } catch (error) {
        console.error(`Failed to focus workspace ${id}:`, error)
      }
    }
    
    return {
      workspaces,
      activeWorkspace,
      windows,
      activeWindow,
      focusWorkspace,
    }
  } catch (error) {
    // Graceful degradation when AstalHyprland is not available
    console.warn("AstalHyprland not available:", error)
    return getDefaultHyprlandState()
  }
}

/**
 * Returns default Hyprland state when service is unavailable
 */
function getDefaultHyprlandState(): HyprlandState {
  return {
    workspaces: [],
    activeWorkspace: null,
    windows: [],
    activeWindow: null,
    focusWorkspace: () => {
      console.warn("Hyprland service not available")
    },
  }
}
