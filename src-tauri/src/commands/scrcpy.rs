use serde::{Deserialize, Serialize};
use crate::scrcpy::{self, ScrcpyOptions};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct MirrorSession {
    pub session_id: String,
    pub device_id: String,
    pub status: SessionStatus,
    pub started_at: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub enum SessionStatus {
    Running,
    Stopped,
    Error,
}

/// Start screen mirroring for a device
#[tauri::command]
pub async fn start_mirroring(
    app: tauri::AppHandle,
    device_id: String,
    options: Option<ScrcpyOptions>,
) -> Result<String, String> {
    let opts = options.unwrap_or_default();
    
    // Execute scrcpy
    let child = scrcpy::execute_scrcpy(
        &app,
        Some(&device_id),
        &opts,
    )?;
    
    let session_id = format!("session_{}", child.id());
    
    // TODO: Store the child process in global state for tracking
    // For now, we just return the session ID
    // The process will run independently
    
    Ok(session_id)
}

/// Stop screen mirroring for a device
#[tauri::command]
pub async fn stop_mirroring(session_id: String) -> Result<bool, String> {
    // TODO: Terminate scrcpy process by session_id
    // Need to implement process tracking first
    Err(format!("Not yet implemented: stop session {}", session_id))
}

/// Get all active mirroring sessions
#[tauri::command]
pub async fn get_active_sessions() -> Result<Vec<MirrorSession>, String> {
    // TODO: Return list of running scrcpy sessions
    // Need to implement process tracking first
    Ok(vec![])
}

/// Check if scrcpy is installed/available
#[tauri::command]
pub async fn check_scrcpy_available(app: tauri::AppHandle) -> Result<bool, String> {
    Ok(scrcpy::check_available(&app))
}

/// Get scrcpy version
#[tauri::command]
pub async fn get_scrcpy_version(app: tauri::AppHandle) -> Result<String, String> {
    scrcpy::get_version(&app)
}
