use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Device {
    pub id: String,
    pub name: String,
    pub model: String,
    pub connection_type: ConnectionType,
    pub status: DeviceStatus,
    pub ip_address: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub enum ConnectionType {
    USB,
    Wireless,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub enum DeviceStatus {
    Connected,
    Disconnected,
    Unauthorized,
    Offline,
}

/// Get list of all connected devices (USB and wireless)
#[tauri::command]
pub async fn get_connected_devices() -> Result<Vec<Device>, String> {
    // TODO: Implement ADB device scanning
    // For now, return empty list
    Ok(vec![])
}

/// Connect to a device wirelessly via IP address
#[tauri::command]
pub async fn connect_wireless_device(ip: String, port: Option<u16>) -> Result<bool, String> {
    let port = port.unwrap_or(5555);
    // TODO: Implement ADB wireless connection
    // adb connect ip:port
    Err(format!("Not yet implemented: connect to {}:{}", ip, port))
}

/// Disconnect a specific device
#[tauri::command]
pub async fn disconnect_device(device_id: String) -> Result<bool, String> {
    // TODO: Implement ADB disconnect
    Err(format!("Not yet implemented: disconnect {}", device_id))
}

/// Enable wireless debugging on a USB-connected device
#[tauri::command]
pub async fn enable_wireless_mode(device_id: String) -> Result<String, String> {
    // TODO: Implement ADB tcpip command
    // adb -s device_id tcpip 5555
    Err(format!("Not yet implemented: enable wireless for {}", device_id))
}

/// Refresh the device list
#[tauri::command]
pub async fn refresh_devices() -> Result<Vec<Device>, String> {
    // TODO: Re-scan for devices
    get_connected_devices().await
}
