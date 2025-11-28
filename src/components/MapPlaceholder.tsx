import React from 'react';
import { View, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../constants/theme';

interface MapPlaceholderProps {
  height?: number;
  style?: StyleProp<ViewStyle>;
}

const MapPlaceholder: React.FC<MapPlaceholderProps> = ({ height = 250, style }) => {
  return (
    <View style={[styles.container, { height }, style]}>
      <Ionicons name="map-outline" size={48} color={COLORS.textLight} />
      <Text style={styles.text}>Map View</Text>
      <Text style={styles.subtext}>
        Enable location services to view map
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.backgroundGray,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: SIZES.radius,
  },
  text: {
    fontSize: SIZES.body,
    fontWeight: '600',
    color: COLORS.textGray,
    marginTop: SIZES.margin,
  },
  subtext: {
    fontSize: SIZES.tiny,
    color: COLORS.textLight,
    marginTop: 4,
  },
});

export default MapPlaceholder;
