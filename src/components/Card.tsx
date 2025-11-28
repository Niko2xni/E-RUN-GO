import React from 'react';
import { View, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';

interface CardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  elevated?: boolean;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, style, onPress, elevated = true, className = '' }) => {
  const Container = onPress ? TouchableOpacity : View;

  const shadowClass = elevated ? 'shadow-md' : '';

  return (
    <Container
      className={`bg-white rounded-2xl p-4 ${shadowClass} ${className}`}
      style={style}
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
    >
      {children}
    </Container>
  );
};

export default Card;
