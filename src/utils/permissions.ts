import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import * as Notifications from 'expo-notifications';
import { Platform, Alert } from 'react-native';
import * as Device from 'expo-device';

export interface PermissionStatus {
  location: boolean;
  camera: boolean;
  mediaLibrary: boolean;
  notifications: boolean;
}

/**
 * Request location permissions for Android 13+
 * Handles foreground and background location permissions
 */
export const requestLocationPermissions = async (): Promise<boolean> => {
  try {
    // Request foreground location permission first
    const { status: foregroundStatus } = await Location.requestForegroundPermissionsAsync();

    if (foregroundStatus !== 'granted') {
      Alert.alert(
        'Permission Required',
        'Location permission is required for delivery navigation and tracking.',
        [{ text: 'OK' }]
      );
      return false;
    }

    // For Android 13+, request background location separately if needed
    if (Platform.OS === 'android' && Platform.Version >= 33) {
      const { status: backgroundStatus } = await Location.requestBackgroundPermissionsAsync();

      if (backgroundStatus !== 'granted') {
        Alert.alert(
          'Background Location',
          'Background location helps track deliveries even when the app is minimized.',
          [{ text: 'OK' }]
        );
      }
    }

    return true;
  } catch (error) {
    console.error('Error requesting location permissions:', error);
    return false;
  }
};

/**
 * Request camera and media permissions for Android 13+
 * Android 13+ uses READ_MEDIA_IMAGES instead of READ_EXTERNAL_STORAGE
 */
export const requestCameraPermissions = async (): Promise<boolean> => {
  try {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert(
        'Permission Required',
        'Camera permission is required to take photos for proof of delivery.',
        [{ text: 'OK' }]
      );
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error requesting camera permissions:', error);
    return false;
  }
};

/**
 * Request media library permissions for Android 13+
 * Uses READ_MEDIA_IMAGES for Android 13+
 */
export const requestMediaLibraryPermissions = async (): Promise<boolean> => {
  try {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert(
        'Permission Required',
        'Photo access is required to select images for proof of delivery.',
        [{ text: 'OK' }]
      );
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error requesting media library permissions:', error);
    return false;
  }
};

/**
 * Request notification permissions for Android 13+
 * POST_NOTIFICATIONS permission is required on Android 13+
 */
export const requestNotificationPermissions = async (): Promise<boolean> => {
  try {
    if (!Device.isDevice) {
      return false;
    }

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      Alert.alert(
        'Notifications Disabled',
        'Enable notifications to receive delivery updates and alerts.',
        [{ text: 'OK' }]
      );
      return false;
    }

    // Configure notification handler
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
      }),
    });

    return true;
  } catch (error) {
    console.error('Error requesting notification permissions:', error);
    return false;
  }
};

/**
 * Request all permissions needed for the app
 * Use this on app initialization
 */
export const requestAllPermissions = async (): Promise<PermissionStatus> => {
  const permissions: PermissionStatus = {
    location: false,
    camera: false,
    mediaLibrary: false,
    notifications: false,
  };

  // Request all permissions
  permissions.location = await requestLocationPermissions();
  permissions.camera = await requestCameraPermissions();
  permissions.mediaLibrary = await requestMediaLibraryPermissions();
  permissions.notifications = await requestNotificationPermissions();

  return permissions;
};

/**
 * Check if all critical permissions are granted
 */
export const checkPermissions = async (): Promise<PermissionStatus> => {
  try {
    const [locationStatus, cameraStatus, mediaStatus, notificationStatus] = await Promise.all([
      Location.getForegroundPermissionsAsync(),
      ImagePicker.getCameraPermissionsAsync(),
      ImagePicker.getMediaLibraryPermissionsAsync(),
      Notifications.getPermissionsAsync(),
    ]);

    return {
      location: locationStatus.status === 'granted',
      camera: cameraStatus.status === 'granted',
      mediaLibrary: mediaStatus.status === 'granted',
      notifications: notificationStatus.status === 'granted',
    };
  } catch (error) {
    console.error('Error checking permissions:', error);
    return {
      location: false,
      camera: false,
      mediaLibrary: false,
      notifications: false,
    };
  }
};

/**
 * Android 13+ specific: Check if app has notification permission
 */
export const hasNotificationPermission = async (): Promise<boolean> => {
  if (Platform.OS !== 'android' || Platform.Version < 33) {
    return true; // Not required on Android < 13
  }

  const { status } = await Notifications.getPermissionsAsync();
  return status === 'granted';
};

/**
 * Android 13+ specific: Check if app has media permissions
 */
export const hasMediaPermission = async (): Promise<boolean> => {
  if (Platform.OS !== 'android' || Platform.Version < 33) {
    return true; // Different permission system on older Android
  }

  const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
  return status === 'granted';
};
