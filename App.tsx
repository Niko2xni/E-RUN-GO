import React, { useEffect, useState, useCallback, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Text, View, StyleSheet, AppState, AppStateStatus } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppProvider } from './src/context/AppContext';
import RootNavigator from './src/navigation/RootNavigator';
import ErrorBoundary from './src/components/ErrorBoundary';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync().catch(console.warn);

const SPLASH_HIDE_TIMEOUT = 5000; // 5 seconds max for splash screen

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const splashHidden = useRef(false);

  // Handle app state changes
  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
        console.log('App has come to the foreground!');
      }
      appState.current = nextAppState;
      setAppStateVisible(appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  // Initialize app
  useEffect(() => {
    let mounted = true;
    let timeoutId: NodeJS.Timeout;

    async function prepare() {
      try {
        console.log('🚀 App initialization started');

        // Pre-load fonts, make any API calls you need to do here
        await new Promise(resolve => setTimeout(resolve, 100));

        if (!mounted) return;
        
        console.log('✅ App initialization complete');
        setAppIsReady(true);
        
        // Set a timeout to ensure splash screen is hidden even if something goes wrong
        timeoutId = setTimeout(() => {
          if (!splashHidden.current) {
            console.warn('⚠️ Force hiding splash screen after timeout');
            SplashScreen.hideAsync().catch(console.warn);
          }
        }, SPLASH_HIDE_TIMEOUT);
        
      } catch (e) {
        console.error('❌ App initialization error:', e);
        if (mounted) {
          setError(String(e));
          setAppIsReady(true);
        }
      }
    }

    prepare();
    
    return () => {
      mounted = false;
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady && !splashHidden.current) {
      try {
        console.log('🎨 Hiding splash screen');
        await SplashScreen.hideAsync();
        splashHidden.current = true;
        console.log('✅ Splash screen hidden');
      } catch (e) {
        console.warn('⚠️ Error hiding splash screen:', e);
      }
    }
  }, [appIsReady]);

  if (!appIsReady) {
    console.log('⏳ App not ready, showing splash...');
    return null;
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Initialization Error</Text>
        <Text style={{ color: 'red' }}>{error}</Text>
      </View>
    );
  }

  console.log('🎯 Rendering main app');

  return (
    <ErrorBoundary>
      <SafeAreaProvider>
        <View style={styles.container} onLayout={onLayoutRootView}>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <AppProvider>
              <StatusBar style="dark" />
              <RootNavigator />
            </AppProvider>
          </GestureHandlerRootView>
        </View>
      </SafeAreaProvider>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

