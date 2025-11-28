import React from 'react';
import { View, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { COLORS, SIZES } from '../constants/theme';

type OrderStatus = 'searching' | 'accepted' | 'pickup' | 'in_transit' | 'completed' | 'cancelled' | 'pending' | 'verified' | string;

interface StatusBadgeProps {
  status: OrderStatus;
  style?: StyleProp<ViewStyle>;
}

interface StatusConfig {
  label: string;
  color: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, style }) => {
  const getStatusConfig = (): StatusConfig => {
    switch (status) {
      case 'searching':
        return { label: 'Searching', color: COLORS.warning };
      case 'accepted':
        return { label: 'Accepted', color: COLORS.primary };
      case 'pickup':
        return { label: 'Picking Up', color: COLORS.primary };
      case 'in_transit':
        return { label: 'In Transit', color: COLORS.primary };
      case 'completed':
        return { label: 'Completed', color: COLORS.success };
      case 'cancelled':
        return { label: 'Cancelled', color: COLORS.error };
      case 'pending':
        return { label: 'Pending', color: COLORS.textGray };
      case 'verified':
        return { label: 'Verified', color: COLORS.success };
      default:
        return { label: status, color: COLORS.textGray };
    }
  };

  const { label, color } = getStatusConfig();

  return (
    <View style={[styles.badge, { backgroundColor: `${color}20` }, style]}>
      <View style={[styles.dot, { backgroundColor: color }]} />
      <Text style={[styles.text, { color }]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SIZES.paddingSmall,
    paddingVertical: 6,
    borderRadius: SIZES.radiusSmall,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  text: {
    fontSize: SIZES.tiny,
    fontWeight: '600',
  },
});

export default StatusBadge;
