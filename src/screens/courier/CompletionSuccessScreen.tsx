import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../../constants/theme';
import Button from '../../components/Button';

const CompletionSuccessScreen = ({ navigation, route }) => {
  const { payout } = route.params;

  const handleBackToDashboard = () => {
    navigation.navigate('CourierDashboard');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.successIcon}>
          <Ionicons name="checkmark-circle" size={120} color={COLORS.success} />
        </View>

        <Text style={styles.title}>Task Completed!</Text>
        <Text style={styles.subtitle}>
          Great job! Your earnings have been added to your wallet.
        </Text>

        <View style={styles.earningsCard}>
          <Text style={styles.earningsLabel}>You Earned</Text>
          <Text style={styles.earningsValue}>₱{payout}</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Button
          title="Back to Dashboard"
          onPress={handleBackToDashboard}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SIZES.paddingLarge * 2,
  },
  successIcon: {
    marginBottom: SIZES.marginLarge * 2,
  },
  title: {
    fontSize: SIZES.h1,
    fontWeight: 'bold',
    color: COLORS.textDark,
    marginBottom: SIZES.marginSmall,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: SIZES.body,
    color: COLORS.textGray,
    textAlign: 'center',
    marginBottom: SIZES.marginLarge * 2,
  },
  earningsCard: {
    width: '100%',
    backgroundColor: COLORS.secondary,
    borderRadius: SIZES.radiusLarge,
    padding: SIZES.paddingLarge * 2,
    alignItems: 'center',
  },
  earningsLabel: {
    fontSize: SIZES.body,
    color: COLORS.textGray,
    marginBottom: SIZES.marginSmall,
  },
  earningsValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  footer: {
    paddingHorizontal: SIZES.paddingLarge,
    paddingVertical: SIZES.paddingLarge,
  },
});

export default CompletionSuccessScreen;
