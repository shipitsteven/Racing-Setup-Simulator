# Racing Setup Simulator

A native desktop application for racing enthusiasts to optimize their car setups across various tracks and racing conditions. Built with React, TypeScript, and Tauri for high performance and cross-platform compatibility.

![Racing Setup Simulator](https://img.shields.io/badge/Platform-Windows%20%7C%20macOS%20%7C%20Linux-blue)
![License](https://img.shields.io/badge/License-CC%20BY--NC%204.0-green)
![Tauri](https://img.shields.io/badge/Tauri-v2.7-orange)
![React](https://img.shields.io/badge/React-19.1.1-61DAFB)

## Features

🏁 **Track Selection** - Choose from 18+ professional racing circuits including Monaco, Spa-Francorchamps, Nürburgring, and more

⚙️ **Complete Setup Control**
- Suspension (springs, dampers, anti-roll bars)
- Aerodynamics (front/rear wings, ride height)  
- Brakes (bias, pressure, cooling)
- Tires (pressure, camber, toe)
- Transmission (differentials, gear ratios)
- Ballast (weight distribution)

📊 **Real-time Feedback** - Instant performance analysis and optimization suggestions as you adjust parameters

🎯 **Professional Interface** - Clean, intuitive design focused on usability during practice sessions

🖥️ **Native Performance** - Desktop application with 60+ FPS performance and native OS integration

## Screenshots

*Track Selection*
- Visual track browser with detailed circuit information
- Weather and track condition settings

*Setup Configuration*
- Comprehensive parameter adjustment with real-time feedback
- Visual indicators for optimal ranges

## Installation

### Prerequisites

- **Node.js** (v18 or higher)
- **Yarn** package manager
- **Rust** (for building Tauri app)

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/shipitsteven/Racing-Setup-Simulator.git
   cd Racing-Setup-Simulator
   ```

2. **Install dependencies**
   ```bash
   yarn install
   ```

3. **Run in development mode**
   ```bash
   yarn tauri:dev
   ```

4. **Build for production**
   ```bash
   yarn tauri:build
   ```

### First Time Setup

#### Install Rust (Required for Tauri)
```bash
# Windows
winget install Rustlang.Rustup

# macOS
brew install rustup-init
rustup-init

# Linux
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

#### Platform-specific Dependencies

**Linux (Ubuntu/Debian)**
```bash
sudo apt update
sudo apt install -y pkg-config libwebkit2gtk-4.1-dev libgtk-3-dev libayatana-appindicator3-dev
```

**Windows**
- Ensure Visual Studio Build Tools are installed
- WebView2 runtime (usually pre-installed on Windows 10/11)

**macOS**
- Xcode Command Line Tools: `xcode-select --install`

## Development

### Available Scripts

- `yarn dev` - Start Vite development server (web version)
- `yarn tauri:dev` - Start Tauri development app
- `yarn tauri:build` - Build production executable
- `yarn build` - Build web assets only
- `yarn lint` - Run ESLint
- `yarn preview` - Preview production build

### Project Structure

```
src/
├── components/
│   ├── layout/          # Header, sidebar, main content
│   ├── setup/           # Setup parameter panels
│   ├── tracks/          # Track selection components
│   └── ui/              # Reusable UI components
├── data/
│   └── tracks.ts        # Track definitions and data
├── stores/
│   ├── setupStore.ts    # Setup state management
│   └── uiStore.ts       # UI state management
├── types/               # TypeScript type definitions
└── utils/               # Helper functions and constants

src-tauri/               # Rust backend configuration
```

## Usage

1. **Select a Track** - Browse the track library and choose your racing circuit
2. **Configure Setup** - Adjust suspension, aerodynamics, brakes, and other parameters
3. **Monitor Feedback** - Watch real-time performance indicators as you make changes
4. **Save Presets** - Store your optimized setups for different tracks and conditions
5. **Export Data** - Share your setups with teammates or racing communities

## Technology Stack

- **Frontend**: React 19.1.1 + TypeScript + Vite
- **Desktop Framework**: Tauri v2.7 (Rust + WebView)
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Icons**: Lucide React
- **Build Tool**: Vite

## Performance

- **Native Desktop Performance**: 60+ FPS on modern hardware
- **Memory Efficient**: <100MB RAM usage typical
- **Fast Startup**: <2 second launch time
- **Cross-Platform**: Windows, macOS, and Linux support

## Contributing

This project is released under Creative Commons BY-NC 4.0 license. Contributions for non-commercial use are welcome:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

Please ensure all changes maintain the professional racing simulator aesthetic and performance standards.

## License

**Creative Commons Attribution-NonCommercial 4.0 International**

Copyright (c) 2025 Steven Wang

✅ **Allowed**: Personal use, education, open source contributions, racing communities
❌ **Not Allowed**: Commercial use, selling software, paid services

See [LICENSE.md](LICENSE.md) for full details.

## Acknowledgments

- Track data and layouts inspired by real-world racing circuits
- Racing physics principles from motorsport engineering
- UI/UX designed for professional racing team workflows

---

**Ready to optimize your lap times?** Download and start configuring your perfect racing setup today!

*Built for racing enthusiasts by racing enthusiasts.*