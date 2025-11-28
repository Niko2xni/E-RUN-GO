import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { useApp } from '../context/AppContext';
import { COLORS } from '../constants/theme';
import AuthNavigator from './AuthNavigator';
import UserNavigator from './UserNavigator';
import CourierNavigator from './CourierNavigator';

// Force light theme to prevent color issues with system dark mode
const AppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: COLORS.primary,
    background: COLORS.background,
    card: COLORS.white,
    text: COLORS.textDark,
    border: COLORS.border,
    notification: COLORS.primary,
  },
};

const RootNavigator = () => {
  const { isAuthenticated, userRole } = useApp();

  return (
    <NavigationContainer theme={AppTheme}>
      {!isAuthenticated ? (
        <AuthNavigator />
      ) : userRole === 'user' ? (
        <UserNavigator />
      ) : (
        <CourierNavigator />
      )}
    </NavigationContainer>
  );
};

export default RootNavigator;
