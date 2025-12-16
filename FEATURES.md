# Scrcpy GUI - Features List

## 🔌 Device Management

| Feature | Description |
|---------|-------------|
| Device Detection | Automatic detection of USB-connected Android devices |
| Device List | View all connected devices with status (Connected, Disconnected, Unauthorized, Offline) |
| Connection Types | Support for both USB and Wireless connections |
| Device Info Display | Shows device name, model, ID, IP address (for wireless) |
| Refresh Devices | Manual refresh button to update device list |

---

## 📶 Wireless Connectivity

| Feature | Description |
|---------|-------------|
| Wireless Setup Wizard | Step-by-step wizard to enable wireless debugging (4 steps: Select USB Device → Enable Wireless → Disconnect USB → Connect Wirelessly) |
| Manual IP Connection | Connect to device by entering IP address and port |
| Enable Wireless Mode | Convert USB connection to wireless on-the-fly |
| Saved Devices | Store wireless device info for quick reconnection |
| Remove Saved Device | Delete devices from saved list |
| Smart IP Detection | Supports various WiFi interface names (wlan, wifi, etc.) |

---

## 🖥️ Screen Mirroring

| Feature | Description |
|---------|-------------|
| Start/Stop Mirroring | One-click mirror control per device |
| Active Session Tracking | Track multiple simultaneous mirror sessions |
| Session Status | Real-time status display (Running, Stopped, Error) |
| Process Management | Automatic cleanup of finished processes |
| Crash Detection | Detect when mirroring unexpectedly stops |
| Session Information | View session ID, device ID, and start time |

---

## ⚙️ Mirroring Settings

| Setting | Options | Default |
|---------|---------|---------|
| **Resolution** | Default (Native), 1920, 1280, 800 | Default |
| **Bitrate** | 1-20 Mbps (customizable) | 8 Mbps |
| **Max FPS** | 15-120 FPS (customizable) | 60 FPS |
| **Always on Top** | On/Off | Off |
| **Stay Awake** | On/Off | On |
| **Turn Screen Off** | On/Off | Off |

### Settings Features
- Save/Reset to defaults
- Persistent storage across sessions
- Real-time setting changes

---

## 🎨 User Interface Components

| Component | Purpose |
|-----------|---------|
| **Tab Navigation** | Switch between "Connected Devices" and "Saved Devices" tabs |
| **Toast Notifications** | Success/Error/Info feedback messages with auto-dismiss |
| **Tooltips** | Helpful hints on hover for key buttons |
| **Loading States** | Spinners and loading indicators for async operations |
| **Error Displays** | Contextual error messages with clear feedback |
| **Settings Panel** | Collapsible settings configuration area |
| **Device Cards** | Individual device information and control cards |
| **Modal Dialogs** | Wireless Setup Wizard and IP Connection dialogs |

---

## 🔧 Backend Capabilities

| Capability | Description |
|------------|-------------|
| **Bundled ADB** | Android Debug Bridge included (no external installation needed) |
| **Bundled scrcpy** | scrcpy binary included with all dependencies |
| **Config Persistence** | Settings and saved devices stored in user config directory (`~/.config/scrcpygui/`) |
| **Process Lifecycle** | Proper cleanup on window close |
| **Multi-Device Support** | Handle multiple simultaneous mirror sessions |
| **Device Commands** | Get device list, connect/disconnect, enable wireless, refresh |
| **Error Handling** | Comprehensive error messages and recovery |
| **Cross-Platform Ready** | Windows support (architecture ready for macOS/Linux) |

---

## 📊 Data Storage

### Saved Devices File
**Location**: `C:\Users\[YourUsername]\AppData\Roaming\scrcpygui\saved_devices.json`

**Format**:
```json
[
  {
    "id": "192.168.1.100:5555",
    "name": "Device Name",
    "model": "Samsung Galaxy S21",
    "connection_type": "Wireless",
    "status": "Connected",
    "ip_address": "192.168.1.100"
  }
]
```

### Settings File
**Location**: `C:\Users\[YourUsername]\AppData\Roaming\scrcpygui\settings.json`

**Format**:
```json
{
  "resolution": "default",
  "bitrate": 8000000,
  "maxFps": 60,
  "alwaysOnTop": false,
  "stayAwake": true,
  "turnScreenOff": false
}
```

---

## 🎯 Suggested Frontend Layout Structure

```
┌─────────────────────────────────────────────────────────────┐
│  Header: Logo | Wireless Setup | Connect by IP | ⟳ | ⚙️    │
├─────────────────────────────────────────────────────────────┤
│  [Settings Panel - Collapsible]                             │
│  - Resolution Selector                                       │
│  - Bitrate Slider                                            │
│  - FPS Slider                                                │
│  - Toggle options (Always on Top, Stay Awake, Screen Off)   │
│  - Save/Reset buttons                                        │
├─────────────────────────────────────────────────────────────┤
│  Tab Bar: [Connected Devices] [Saved Devices]               │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  CONNECTED DEVICES TAB:                                     │
│  ┌─────────────────┐  ┌─────────────────┐                   │
│  │  Device Card    │  │  Device Card    │                   │
│  │  - Device Icon  │  │  - Device Icon  │                   │
│  │  - Name/Model   │  │  - Name/Model   │                   │
│  │  - Status badge │  │  - Status badge │                   │
│  │  - Type badge   │  │  - Type badge   │                   │
│  │  - IP address   │  │  - IP address   │                   │
│  │  - Mirror btn   │  │  - Mirror btn   │                   │
│  │  - Action btns  │  │  - Action btns  │                   │
│  └─────────────────┘  └─────────────────┘                   │
│                                                             │
│  SAVED DEVICES TAB:                                         │
│  [Device List with Connect/Remove options]                  │
│                                                             │
│  MODALS:                                                    │
│  - Wireless Setup Wizard (4-step process)                   │
│  - IP Connection Dialog                                     │
│  - Error Notifications                                      │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 🚀 Device Card Features

Each device card displays:

### Status Information
- **Device Status**: Connected, Disconnected, Unauthorized, Offline
- **Connection Type**: USB or Wireless badge
- **Device Details**: Name, Model, Serial ID
- **Network Info**: IP address (for wireless devices)

### Control Actions
- **Mirror Button**: Start/Stop screen mirroring
- **Enable Wireless**: Convert USB to wireless (USB devices only)
- **Connect**: Reconnect to device (wireless devices)
- **Disconnect**: Disconnect from device (wireless devices)

### Session Status
- Display active mirroring session with real-time status
- Show crash detection alerts
- Display session duration and process information

---

## 🔐 Device Authorization

### USB Device States
- **Connected**: Device authorized and ready
- **Unauthorized**: Awaiting user approval on device
- **Offline**: Device not responding
- **Disconnected**: Device not found

### Authorization Flow
When a USB device shows "Unauthorized":
1. Check your device screen
2. Approve the "Allow USB debugging" prompt
3. Optionally check "Always allow from this computer"
4. Click Refresh to update status

---

## 🎛️ Wireless Setup Process

### Step 1: Select USB Device
- Choose a USB-connected device from available list
- Shows device name and model

### Step 2: Enable Wireless Mode
- Converts USB connection to wireless debugging
- Extracts device IP address automatically
- Shows confirmation message

### Step 3: Disconnect USB
- Instructs user to physically disconnect USB cable
- Shows device IP for manual connection if needed

### Step 4: Connect Wirelessly
- Establishes wireless connection
- Saves device to saved devices list
- Completes setup with success confirmation

---

## 🔄 Device Refresh Behavior

- **Manual Refresh**: Click refresh button in header
- **Auto-Polling**: Sessions list auto-updates every 2 seconds
- **Device List Update**: Updates when:
  - User manually clicks refresh
  - Wireless setup completes
  - Device connection/disconnection occurs

---

## ⌨️ Keyboard Shortcuts & Accessibility

- **Enter Key**: Submit dialogs (IP Connection dialog)
- **Tab Navigation**: Navigate through form fields
- **Tooltips**: Hover over buttons for help text
- **Escape Key**: Close modals (supported in browsers)

---

## 📱 Device Requirements

### Android Device Requirements
- Android 5.0 or higher
- USB debugging enabled (for USB connection setup)
- WiFi connection (for wireless connection)
- Same network as computer (for wireless operation)

### Windows PC Requirements
- Windows 10 or higher
- Bundled ADB and scrcpy (included)
- Minimum 200MB disk space

---

## 🐛 Error Handling & Recovery

### Common Error Scenarios

| Error | Cause | Solution |
|-------|-------|----------|
| "Could not determine device IP" | Device not on WiFi | Ensure device is connected to WiFi network |
| "Authorization Required" | Device not approved | Approve USB debugging on device |
| "Failed to connect" | Wrong IP/Port | Verify IP address and port (default 5555) |
| "Failed to save device" | Permission issue | Check config directory permissions |
| "Device offline" | Connection lost | Reconnect device via USB or WiFi |

---

## 📝 Notes for Frontend Redesign

### Color Scheme Suggestions
- **Primary**: Blue (#3B82F6)
- **Success**: Green (#10B981)
- **Warning**: Yellow (#F59E0B)
- **Error**: Red (#EF4444)
- **Info**: Cyan (#06B6D4)

### Typography
- **Headers**: Bold, 18-24px
- **Body Text**: Regular, 14px
- **Small Text**: Regular, 12px
- **Monospace**: Device IDs, IP addresses

### Icons
- Device: Smartphone icon
- USB: USB plug icon
- WiFi: WiFi signal icon
- Mirror: Monitor/Display icon
- Settings: Gear icon
- Refresh: Circular arrow icon

---

## 🔮 Future Enhancement Opportunities

- [ ] Dark mode support
- [ ] Device screenshot capture
- [ ] File transfer between device and PC
- [ ] Device file explorer
- [ ] Screen recording with save option
- [ ] Touch event visualization
- [ ] Gesture recording and playback
- [ ] Device log viewer
- [ ] Performance metrics display
- [ ] Multi-language support
- [ ] Custom keyboard mappings
- [ ] Scene/profile saving for different use cases
