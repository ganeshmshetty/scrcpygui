# Scrcpy GUI

A modern, intuitive graphical interface for [scrcpy](https://github.com/Genymobile/scrcpy) - the powerful Android screen mirroring tool.

## Features

- **Device Management** - Automatic USB device detection and wireless connection support
- **Mirror Control** - One-click screen mirroring with customizable settings
- **Wireless Setup** - Simplified wizard to switch from USB to Wireless (TCP/IP) mode
- **Advanced Settings** - Persistent configuration for resolution, bitrate, FPS, and display options
- **Session Management** - Track and control multiple active mirroring sessions
- **Modern UI** - Clean, responsive interface built with React and Tailwind CSS

## Requirements

- Windows 10/11
- Android device (5.0+) with USB debugging enabled

## Installation

1. Download the latest installer (`.msi` or `.exe`) from the [Releases](https://github.com/ganeshmshetty/scrcpygui/releases) page.
2. Run the installer and follow the on-screen instructions.
3. Launch **Scrcpy GUI** from your Start Menu.

## Documentation

For detailed instructions, please refer to the [User Guide](docs/USER_GUIDE.md).

## Development

### Prerequisites

- [Rust](https://www.rust-lang.org/tools/install)
- [Node.js](https://nodejs.org/)
- [pnpm](https://pnpm.io/) (or npm/yarn)

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/ganeshmshetty/scrcpygui.git
   cd scrcpygui
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Run in development mode:
   ```bash
   pnpm tauri dev
   ```

## Technology Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Vite
- **Backend**: Rust, Tauri
- **Core**: Scrcpy, ADB

## Acknowledgments

- Powered by [scrcpy](https://github.com/Genymobile/scrcpy) by Genymobile
- Built with [Tauri](https://tauri.app/)

