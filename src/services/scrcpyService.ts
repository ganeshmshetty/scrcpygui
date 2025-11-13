import { invoke } from "@tauri-apps/api/core";
import type { ScrcpyOptions, MirrorSession } from "../types/tauri-commands";

/**
 * Service for scrcpy-related operations
 */
export const scrcpyService = {
  /**
   * Start screen mirroring for a device
   */
  async startMirroring(
    deviceId: string,
    options?: Partial<ScrcpyOptions>
  ): Promise<string> {
    return await invoke<string>("start_mirroring", { deviceId, options });
  },

  /**
   * Stop screen mirroring session
   */
  async stopMirroring(sessionId: string): Promise<boolean> {
    return await invoke<boolean>("stop_mirroring", { sessionId });
  },

  /**
   * Get all active mirroring sessions
   */
  async getActiveSessions(): Promise<MirrorSession[]> {
    return await invoke<MirrorSession[]>("get_active_sessions");
  },

  /**
   * Check if scrcpy is available
   */
  async checkAvailable(): Promise<boolean> {
    return await invoke<boolean>("check_scrcpy_available");
  },

  /**
   * Get scrcpy version
   */
  async getVersion(): Promise<string> {
    return await invoke<string>("get_scrcpy_version");
  },

  /**
   * Test scrcpy execution (gets version to verify it works)
   */
  async testExecution(): Promise<string> {
    return await invoke<string>("test_scrcpy_execution");
  },
};
