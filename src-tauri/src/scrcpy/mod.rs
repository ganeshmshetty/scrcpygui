use std::process::{Command, Child, Stdio};
use std::collections::HashMap;
use std::sync::Mutex;
use serde::{Serialize, Deserialize};
use crate::utils;

/// Global state to track active scrcpy processes
pub struct ScrcpyState {
    pub processes: Mutex<HashMap<String, Child>>,
}

impl ScrcpyState {
    pub fn new() -> Self {
        Self {
            processes: Mutex::new(HashMap::new()),
        }
    }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ScrcpyOptions {
    pub max_size: Option<u32>,
    pub bit_rate: Option<u32>,
    pub max_fps: Option<u32>,
    pub always_on_top: bool,
    pub stay_awake: bool,
    pub turn_screen_off: bool,
}

impl Default for ScrcpyOptions {
    fn default() -> Self {
        Self {
            max_size: Some(1920),
            bit_rate: Some(8000000), // 8Mbps
            max_fps: Some(60),
            always_on_top: false,
            stay_awake: true,
            turn_screen_off: false,
        }
    }
}

/// Execute scrcpy with the given device ID and options
pub fn execute_scrcpy(
    app: &tauri::AppHandle,
    device_id: Option<&str>,
    options: &ScrcpyOptions,
) -> Result<Child, String> {
    let scrcpy_path = utils::get_scrcpy_path(app)?;
    let scrcpy_dir = utils::get_scrcpy_dir(app)?;
    
    let mut cmd = Command::new(scrcpy_path);
    
    // Set working directory to scrcpy directory (for DLL dependencies)
    cmd.current_dir(scrcpy_dir);
    
    // Add device ID if specified
    if let Some(id) = device_id {
        cmd.arg("-s").arg(id);
    }
    
    // Add options
    if let Some(max_size) = options.max_size {
        cmd.arg("--max-size").arg(max_size.to_string());
    }
    
    if let Some(bit_rate) = options.bit_rate {
        cmd.arg("--bit-rate").arg(bit_rate.to_string());
    }
    
    if let Some(max_fps) = options.max_fps {
        cmd.arg("--max-fps").arg(max_fps.to_string());
    }
    
    if options.always_on_top {
        cmd.arg("--always-on-top");
    }
    
    if options.stay_awake {
        cmd.arg("--stay-awake");
    }
    
    if options.turn_screen_off {
        cmd.arg("--turn-screen-off");
    }
    
    // Spawn the process
    cmd.stdout(Stdio::piped())
        .stderr(Stdio::piped())
        .spawn()
        .map_err(|e| format!("Failed to start scrcpy: {}", e))
}

/// Get scrcpy version
pub fn get_version(app: &tauri::AppHandle) -> Result<String, String> {
    let scrcpy_path = utils::get_scrcpy_path(app)?;
    let scrcpy_dir = utils::get_scrcpy_dir(app)?;
    
    let output = Command::new(scrcpy_path)
        .current_dir(scrcpy_dir)
        .arg("--version")
        .output()
        .map_err(|e| format!("Failed to execute scrcpy: {}", e))?;
    
    if output.status.success() {
        let version = String::from_utf8_lossy(&output.stdout).to_string();
        Ok(version.trim().to_string())
    } else {
        let error = String::from_utf8_lossy(&output.stderr).to_string();
        Err(format!("Scrcpy error: {}", error))
    }
}

/// Check if scrcpy is available
pub fn check_available(app: &tauri::AppHandle) -> bool {
    utils::get_scrcpy_path(app).is_ok()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_default_options() {
        let options = ScrcpyOptions::default();
        assert_eq!(options.max_size, Some(1920));
        assert_eq!(options.bit_rate, Some(8000000));
        assert_eq!(options.max_fps, Some(60));
        assert_eq!(options.stay_awake, true);
    }
}
