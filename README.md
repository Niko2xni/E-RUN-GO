# E-Run Go

A mobile-only on-demand delivery and errand-running app built with React Native and Expo. Inspired by Gojek's green theme, E-Run Go features dual user roles (**User/Customer** and **Courier/Driver**) with dedicated dashboards and workflows.

![Platform](https://img.shields.io/badge/Platform-iOS%20%7C%20Android-blue)
![Framework](https://img.shields.io/badge/Framework-React%20Native-61DAFB)
![Expo](https://img.shields.io/badge/Expo-~54.0.0-000020)

## 📱 Features

### User (Customer) Features
- ✅ **Quick Login**: Bypass buttons for instant testing
- ✅ **Dashboard**: View ongoing/recent orders with quick actions
- ✅ **Create Task**: Multi-step flow (Send Item, Run Errand, Multi-stop)
- ✅ **Live Tracking**: Real-time courier tracking with maps
- ✅ **Order History**: View past deliveries
- ✅ **Profile**: Manage settings and saved locations

### Courier (Driver) Features
- ✅ **Online/Offline Toggle**: Control availability
- ✅ **Earnings Dashboard**: View earnings and transactions
- ✅ **Task Management**: Accept/decline delivery requests
- ✅ **Navigation**: Step-by-step delivery guidance
- ✅ **Proof of Delivery**: Photo capture and recipient confirmation
- ✅ **Wallet**: Transaction history and payout requests

## 🎨 Design

- **Theme**: Gojek-inspired green (#10b981)
- **UI**: Modern, clean with rounded cards and soft shadows
- **Typography**: Clear, legible, optimized for mobile
- **Icons**: Ionicons from @expo/vector-icons
- **Platform**: Mobile-only (iOS & Android)

## 🛠 Tech Stack

- **Framework**: React Native with Expo SDK 54
- **Language**: TypeScript
- **Styling**: NativeWind (Tailwind for React Native)
- **Navigation**: React Navigation (Stack & Bottom Tabs)
- **Maps**: React Native Maps
- **Image Picker**: Expo Image Picker (Android 13+ compatible)
- **Location**: Expo Location (Background support)
- **Notifications**: Expo Notifications
- **State**: React Context API

## 📦 Installation

### Prerequisites
- Node.js 16+
- npm or yarn
- Expo account (for development builds)

### Setup

```bash
# Clone repository
git clone https://github.com/NOTMORSE-PROG/E-RUN-GO.git
cd E-RUN-GO

# Install dependencies
npm install

# Start development server
npm start
```

## 🚀 Development Build

This app uses **Expo Development Builds** for full native feature support:

```bash
# Login to Expo
npm run eas:login

# Configure project (first time only)
npm run eas:configure

# Build development APK for Android
npm run build:dev

# Build for iOS (requires Mac + Apple Developer)
npm run build:dev:ios
```

After building:
1. Download the APK from the link provided
2. Install on your Android device
3. Run `npm start` and scan the QR code

See [SETUP.md](SETUP.md) for detailed setup instructions.

## 🧪 Testing

### Quick Login (Bypass)
On the login screen, use the **Quick Access** bypass buttons:
- **Bypass as User** → Go directly to User Dashboard
- **Bypass as Courier** → Go directly to Courier Dashboard

No credentials needed!

### User Flow
```
Welcome → Login → User Dashboard → Create Task → Live Tracking
                           ↓
                    Order History
                           ↓
                    User Profile
```

### Courier Flow
```
Welcome → Login → Courier Dashboard → Task Detail → On Trip → Completion
                           ↓
                    Earnings & Wallet
                           ↓
                    Courier Profile
```

## 📁 Project Structure

```
E-RUN-GO/
├── src/
│   ├── components/       # Reusable UI components
│   ├── constants/        # Theme and constants
│   ├── context/          # App context (state management)
│   ├── navigation/       # Navigation structure
│   ├── screens/          # All app screens
│   │   ├── auth/         # Welcome, Login, Register
│   │   ├── user/         # Customer screens
│   │   └── courier/      # Driver screens
│   └── utils/            # Utility functions
├── assets/               # Images, fonts, icons
├── App.tsx               # Main app entry
├── app.json              # Expo configuration
├── eas.json              # EAS Build configuration
└── package.json          # Dependencies
```

## 🔧 Build Scripts

```bash
npm start               # Start Expo dev server
npm run android         # Run on Android emulator
npm run ios             # Run on iOS simulator

npm run build:dev       # Build Android development APK
npm run build:dev:ios   # Build iOS development IPA
npm run build:preview   # Build preview APK
npm run build:production # Build production APK

npm run eas:login       # Login to Expo
npm run eas:configure   # Configure EAS project
```

## 🎯 Features Implemented

✅ Authentication flow with bypass option
✅ Dual role navigation (User/Courier)
✅ Safe area handling for all devices
✅ Custom components (Button, Card, Input, Badge)
✅ Map integration with react-native-maps
✅ Image picker for proof of delivery
✅ Location services
✅ Push notification setup
✅ Bottom tab navigation
✅ Error boundary
✅ Splash screen

## 📝 Notes

### Frontend-Only
This is currently a **frontend-only** implementation:
- No real backend/database
- Mock data in React Context
- Simulated authentication
- No actual API calls

### Production Requirements
For production deployment, you'll need:
- Backend API (Node.js, Firebase, etc.)
- Real authentication (JWT, OAuth)
- Actual map routing & location services
- Real-time updates (WebSockets/Firebase)
- Cloud storage for images
- Payment gateway integration
- Push notification service

## 🐛 Troubleshooting

### Metro Bundler Errors
```bash
npm start -- --clear
```

### Module Not Found
```bash
rm -rf node_modules
npm install
```

### Build Issues
```bash
npx eas-cli build:list  # Check build status
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is for educational and demonstration purposes.

## 🙏 Acknowledgments

- Inspired by Gojek's UI/UX
- Built with Expo and React Native
- Icons by @expo/vector-icons

---

**Built with ❤️ for delivery and errand services**
