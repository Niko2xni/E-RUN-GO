# E-Run Go - Setup Guide

Complete guide to set up and run the E-Run Go delivery app.

## 📋 Prerequisites

- **Node.js** 16+ ([Download](https://nodejs.org))
- **npm** or **yarn**
- **Expo account** ([Sign up](https://expo.dev/signup))
- **Android device** or emulator for testing

## 🚀 Quick Start

### 1. Clone Repository

```bash
git clone https://github.com/NOTMORSE-PROG/E-RUN-GO.git
cd E-RUN-GO
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Development Server

```bash
npm start
```

## 📱 Development Build (Recommended)

For full native feature support (maps, location, notifications), use development builds:

### First-Time Setup

```bash
# Login to Expo
npm run eas:login

# Configure EAS (creates Expo project)
npm run eas:configure
```

### Build APK

```bash
# Android development build
npm run build:dev
```

**What happens:**
1. ✅ Code uploads to Expo servers (~30s)
2. ✅ Build starts (10-20 minutes first time)
3. ✅ Download link provided when complete
4. ✅ APK includes dev tools + hot reload

### Install & Run

1. **Download APK** from build link
2. **Install on device** (enable "Install from unknown sources")
3. **Start dev server:**
   ```bash
   npm start
   ```
4. **Scan QR code** with development app

## 🧪 Testing

### Quick Login (No Credentials Needed!)

The login screen has **bypass buttons** for instant access:

- **Bypass as User** → Opens User Dashboard
- **Bypass as Courier** → Opens Courier Dashboard

No need to enter email/password!

### Test User Flow

1. Tap "Continue as User" on welcome screen
2. Tap "Bypass as User" on login
3. Explore dashboard
4. Create a task (Send Item/Run Errand)
5. View live tracking
6. Check order history

### Test Courier Flow

1. Tap "Continue as Courier" on welcome screen
2. Tap "Bypass as Courier" on login
3. Toggle online status
4. View available tasks
5. Accept a task
6. Complete delivery with photo

## 🛠 Build Commands

```bash
# Development
npm start                    # Start dev server
npm run android             # Run on Android emulator
npm run ios                 # Run on iOS simulator (Mac only)

# EAS Builds
npm run build:dev           # Android development APK
npm run build:dev:ios       # iOS development IPA
npm run build:preview       # Preview APK
npm run build:production    # Production APK

# EAS Setup
npm run eas:login           # Login to Expo
npm run eas:configure       # Configure project
```

## 📁 Project Structure

```
E-RUN-GO/
├── src/
│   ├── components/          # Reusable UI (Button, Card, Input, etc.)
│   ├── constants/           # Theme colors and styles
│   ├── context/             # AppContext (state management)
│   ├── navigation/          # Navigation setup
│   │   ├── AuthNavigator.tsx
│   │   ├── UserNavigator.tsx
│   │   ├── CourierNavigator.tsx
│   │   └── RootNavigator.tsx
│   ├── screens/
│   │   ├── auth/            # WelcomeScreen, LoginScreen, RegisterScreen
│   │   ├── user/            # User role screens
│   │   └── courier/         # Courier role screens
│   └── utils/               # Utility functions
├── assets/                  # Images, splash, icon
├── App.tsx                  # Main app entry
├── app.json                 # Expo configuration
├── eas.json                 # EAS Build configuration
└── package.json             # Dependencies
```

## 🎨 Customization

### Theme Colors

Edit `src/constants/theme.ts`:

```typescript
export const COLORS = {
  primary: '#10b981',      // Main green
  secondary: '#d1fae5',    // Light green
  // ... customize other colors
};
```

### App Name & Icon

Edit `app.json`:

```json
{
  "expo": {
    "name": "Your App Name",
    "icon": "./assets/your-icon.png",
    "splash": {
      "image": "./assets/your-splash.png"
    }
  }
}
```

## 🐛 Troubleshooting

### Metro Bundler Errors

```bash
npm start -- --clear
```

### Module Not Found

```bash
rm -rf node_modules package-lock.json
npm install
```

### Port Already in Use

```bash
npx kill-port 8081
npx kill-port 19000
npm start
```

### Build Failed

Check build logs:

```bash
npx eas-cli build:list
npx eas-cli build:view [BUILD_ID]
```

### Can't Install APK

1. Enable "Install from unknown sources" in Android settings
2. Check storage space
3. Try downloading again

### QR Code Doesn't Work

1. Ensure phone and computer on same WiFi
2. Try entering URL manually in dev app
3. Check firewall settings

## 📚 Key Features

✅ **Bypass Login** - Instant access to dashboards
✅ **Dual Roles** - User and Courier navigation
✅ **Safe Areas** - Handles notches and home indicators
✅ **Maps Integration** - react-native-maps
✅ **Image Picker** - Proof of delivery photos
✅ **Location Services** - Background location tracking
✅ **Push Notifications** - Task updates
✅ **Error Boundary** - Graceful error handling

## 🔄 Development Workflow

### Daily Development

```bash
# Start dev server
npm start

# App updates automatically with hot reload!
```

### Adding Dependencies

```bash
npm install package-name

# Rebuild if native dependency
npm run build:dev
```

### Updating Expo SDK

```bash
npx expo upgrade

# Rebuild after upgrade
npm run build:dev
```

## 📖 Additional Resources

- [Expo Documentation](https://docs.expo.dev/)
- [EAS Build](https://docs.expo.dev/build/introduction/)
- [React Navigation](https://reactnavigation.org/)
- [React Native Maps](https://github.com/react-native-maps/react-native-maps)
- [Expo Development Builds](https://docs.expo.dev/develop/development-builds/introduction/)

## 💡 Tips

- **First build takes ~15-20 mins** - Subsequent builds are faster
- **Development build stays on device** - Just run `npm start` for new code
- **Use bypass buttons** - Skip login during development
- **Check build queue** - `npx eas-cli build:list`
- **Free tier: 30 builds/month** - More than enough for development

## 🤝 Need Help?

1. Check [README.md](README.md) for overview
2. Review [Expo Docs](https://docs.expo.dev/)
3. Search [GitHub Issues](https://github.com/NOTMORSE-PROG/E-RUN-GO/issues)
4. Ask in [Expo Forums](https://forums.expo.dev/)

---

**Happy coding! 🚀**
