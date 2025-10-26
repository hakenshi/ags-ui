/**
 * useAudio - Hook for reactive audio control
 * 
 * Provides reactive access to audio devices (speaker and microphone) with
 * volume control and mute functionality via WirePlumber.
 * 
 * @example
 * ```tsx
 * const audio = useAudio()
 * 
 * <box>
 *   <button onClick={() => audio.toggleMute("speaker")}>
 *     <icon name={audio.speaker.muted ? "audio-volume-muted" : "audio-volume-high"} />
 *   </button>
 *   <Slider 
 *     value={audio.speaker.volume} 
 *     onValueChange={(v) => audio.setVolume("speaker", v)}
 *     min={0}
 *     max={100}
 *   />
 * </box>
 * ```
 */

import AstalWp from "gi://AstalWp?version=0.1"
import { createReactiveBinding } from "../primitives/createBinding"

export interface AudioState {
  speaker: {
    /** Volume level (0-100) */
    volume: number
    /** Whether speaker is muted */
    muted: boolean
  }
  microphone: {
    /** Volume level (0-100) */
    volume: number
    /** Whether microphone is muted */
    muted: boolean
  }
  /** Set volume for a device */
  setVolume: (device: "speaker" | "microphone", volume: number) => void
  /** Toggle mute for a device */
  toggleMute: (device: "speaker" | "microphone") => void
}

/**
 * Hook to access audio control reactively
 * 
 * @returns AudioState object with reactive audio information and controls
 */
export function useAudio(): AudioState {
  try {
    const wp = AstalWp.get_default()
    
    if (!wp) {
      return getDefaultAudioState()
    }
    
    // Get default speaker (audio sink)
    const speaker = wp.audio?.default_speaker || wp.get_default_speaker?.()
    
    // Get default microphone (audio source)
    const microphone =
      wp.audio?.default_microphone || wp.get_default_microphone?.()
    
    // Create reactive bindings for speaker
    const speakerVolume = speaker
      ? createReactiveBinding(speaker, "volume")
      : 0
    const speakerMuted = speaker ? createReactiveBinding(speaker, "mute") : false
    
    // Create reactive bindings for microphone
    const microphoneVolume = microphone
      ? createReactiveBinding(microphone, "volume")
      : 0
    const microphoneMuted = microphone
      ? createReactiveBinding(microphone, "mute")
      : false
    
    /**
     * Set volume for a device
     */
    const setVolume = (device: "speaker" | "microphone", volume: number) => {
      const target = device === "speaker" ? speaker : microphone
      if (target) {
        // Clamp volume between 0 and 100
        const clampedVolume = Math.max(0, Math.min(100, volume))
        target.volume = clampedVolume / 100 // WirePlumber uses 0-1 range
      }
    }
    
    /**
     * Toggle mute for a device
     */
    const toggleMute = (device: "speaker" | "microphone") => {
      const target = device === "speaker" ? speaker : microphone
      if (target) {
        target.mute = !target.mute
      }
    }
    
    return {
      speaker: {
        volume: speakerVolume,
        muted: speakerMuted,
      },
      microphone: {
        volume: microphoneVolume,
        muted: microphoneMuted,
      },
      setVolume,
      toggleMute,
    }
  } catch (error) {
    // Graceful degradation when AstalWp is not available
    console.warn("AstalWp not available:", error)
    return getDefaultAudioState()
  }
}

/**
 * Returns default audio state when service is unavailable
 */
function getDefaultAudioState(): AudioState {
  return {
    speaker: {
      volume: 0,
      muted: false,
    },
    microphone: {
      volume: 0,
      muted: false,
    },
    setVolume: () => {
      console.warn("Audio service not available")
    },
    toggleMute: () => {
      console.warn("Audio service not available")
    },
  }
}
