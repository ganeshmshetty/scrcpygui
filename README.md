# Scrcpy GUI - Android Screen Mirroring

A modern, user-friendly Windows desktop application built with Tauri, React, and TypeScript that provides a beautiful GUI wrapper for Scrcpy, making Android screen mirroring effortless.

## ✨ Features

### 🎨 Modern UI/UX (Phase 6 ✅)
- **Professional Design**: Clean white and blue color scheme
- **Toast Notifications**: Real-time feedback for all operations
- **Loading States**: Visual indicators during async operations
- **Tooltips**: Contextual help throughout the interface
- **Smooth Animations**: Polished transitions and effects
- **Responsive Layout**: Adapts to different window sizes

### 📱 Device Management
- **Auto-Discovery**: Automatically detect USB and wireless devices
- **Wireless Setup Wizard**: Step-by-step guide for wireless connection
- **Saved Devices**: Quick reconnect to frequently used devices
- **Device Status**: Real-time connection and mirroring status

### 🎬 Screen Mirroring
- **One-Click Mirroring**: Start mirroring with a single click
- **Process Management**: Track and manage active sessions
- **Customizable Settings**: Resolution, bitrate, FPS, and more
- **Advanced Options**: Always-on-top, stay awake, turn screen off

### ⚙️ Settings & Configuration
- **Resolution Control**: Default, 1080p, 720p, or custom
- **Bitrate Adjustment**: 1-20 Mbps for quality vs performance
- **FPS Limiter**: 15-120 FPS to optimize performance
- **Display Options**: Persistent settings per device

## 🎨 UI Theme

The application features a professional **white and blue** color scheme:
- **Primary Color**: Blue (#3b82f6)
- **Background**: White with subtle gradients
- **Accent Elements**: Various shades of blue
- **Status Indicators**: Color-coded (green, red, yellow, blue)

## 🚀 Getting Started

### Prerequisites
- Windows 10/11
- Node.js 16+
- Rust (latest stable)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd scrcpygui
```

2. Install dependencies:
```bash
npm install
```

3. Run in development mode:
```bash
npm run tauri dev
```

4. Build for production:
```bash
npm run tauri build
```

## 📋 Project Status

- ✅ **Phase 1**: Project Setup & Foundation
- ✅ **Phase 2**: ADB Integration & Device Discovery
- ✅ **Phase 3**: Scrcpy Integration
- ✅ **Phase 4**: Wireless Connection Setup
- ✅ **Phase 5**: Settings & Configuration
- ✅ **Phase 6**: UI/UX Polish
- ⏳ **Phase 7**: Testing & Bug Fixes
- ⏳ **Phase 8**: Build & Distribution

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript + Tailwind CSS
- **Backend**: Rust + Tauri
- **External Tools**: Scrcpy, ADB (bundled)
- **Platform**: Windows

## 📖 Documentation

See [plan.md](./plan.md) for detailed project planning and roadmap.
See [PHASE6_SUMMARY.md](./PHASE6_SUMMARY.md) for UI/UX implementation details.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode) + [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)

