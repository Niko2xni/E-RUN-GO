interface Colors {
  primary: string;
  primaryDark: string;
  primaryLight: string;
  secondary: string;
  background: string;
  backgroundGray: string;
  textDark: string;
  textGray: string;
  textLight: string;
  border: string;
  error: string;
  success: string;
  warning: string;
  white: string;
  black: string;
  shadow: string;
}

interface Sizes {
  base: number;
  font: number;
  radius: number;
  radiusSmall: number;
  radiusLarge: number;
  padding: number;
  paddingSmall: number;
  paddingLarge: number;
  margin: number;
  marginSmall: number;
  marginLarge: number;
  h1: number;
  h2: number;
  h3: number;
  h4: number;
  body: number;
  small: number;
  tiny: number;
}

interface ShadowStyle {
  shadowColor: string;
  shadowOffset: {
    width: number;
    height: number;
  };
  shadowOpacity: number;
  shadowRadius: number;
  elevation: number;
}

interface Shadows {
  small: ShadowStyle;
  medium: ShadowStyle;
  large: ShadowStyle;
}

interface Fonts {
  regular: string;
  medium: string;
  bold: string;
  semiBold: string;
}

export const COLORS: Colors = {
  primary: '#10b981',
  primaryDark: '#059669',
  primaryLight: '#34d399',
  secondary: '#d1fae5',
  background: '#ffffff',
  backgroundGray: '#f9fafb',
  textDark: '#1f2937',
  textGray: '#6b7280',
  textLight: '#9ca3af',
  border: '#e5e7eb',
  error: '#ef4444',
  success: '#10b981',
  warning: '#f59e0b',
  white: '#ffffff',
  black: '#000000',
  shadow: 'rgba(0, 0, 0, 0.1)',
};

export const SIZES: Sizes = {
  base: 8,
  font: 14,
  radius: 12,
  radiusSmall: 8,
  radiusLarge: 16,
  padding: 16,
  paddingSmall: 12,
  paddingLarge: 24,
  margin: 16,
  marginSmall: 8,
  marginLarge: 24,

  // Font sizes
  h1: 32,
  h2: 24,
  h3: 20,
  h4: 18,
  body: 16,
  small: 14,
  tiny: 12,
};

export const SHADOWS: Shadows = {
  small: {
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  medium: {
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  large: {
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
};

export const FONTS: Fonts = {
  regular: 'System',
  medium: 'System',
  bold: 'System',
  semiBold: 'System',
};
