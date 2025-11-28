import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '../constants/theme';

import CourierDashboardScreen from '../screens/courier/CourierDashboardScreen';
import TaskDetailScreen from '../screens/courier/TaskDetailScreen';
import OnTripScreen from '../screens/courier/OnTripScreen';
import TaskCompletionScreen from '../screens/courier/TaskCompletionScreen';
import CompletionSuccessScreen from '../screens/courier/CompletionSuccessScreen';
import CourierEarningsScreen from '../screens/courier/CourierEarningsScreen';
import CourierProfileScreen from '../screens/courier/CourierProfileScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="CourierDashboard" component={CourierDashboardScreen} />
    <Stack.Screen name="TaskDetail" component={TaskDetailScreen} />
    <Stack.Screen name="OnTrip" component={OnTripScreen} />
    <Stack.Screen name="TaskCompletion" component={TaskCompletionScreen} />
    <Stack.Screen name="CompletionSuccess" component={CompletionSuccessScreen} />
  </Stack.Navigator>
);

const EarningsStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="CourierEarnings" component={CourierEarningsScreen} />
  </Stack.Navigator>
);

const ProfileStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="CourierProfile" component={CourierProfileScreen} />
  </Stack.Navigator>
);

const CourierNavigator = () => {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Earnings') {
            iconName = focused ? 'wallet' : 'wallet-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textGray,
        tabBarStyle: {
          paddingBottom: insets.bottom > 0 ? insets.bottom : 8,
          paddingTop: 8,
          height: 60 + (insets.bottom > 0 ? insets.bottom : 0),
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Earnings" component={EarningsStack} />
      <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
  );
};

export default CourierNavigator;
