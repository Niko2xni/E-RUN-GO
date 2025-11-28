import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Button from '../../components/Button';

const WelcomeScreen = ({ navigation }: any) => {
  return (
    <LinearGradient
      colors={['#10b981', '#059669']}
      style={styles.gradient}
    >
      <View style={styles.container}>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <View style={styles.iconContainer}>
            <Ionicons name="bicycle" size={90} color="white" />
          </View>
          <Text style={styles.title}>E-Run Go</Text>
          <Text style={styles.subtitle}>
            Fast errands and delivery in your city
          </Text>
        </View>

        {/* Illustration Section */}
        <View style={styles.illustrationSection}>
          <View style={styles.iconRow}>
            <Ionicons name="cube-outline" size={50} color="rgba(255,255,255,0.3)" />
            <Ionicons name="location-outline" size={50} color="rgba(255,255,255,0.3)" style={styles.middleIcon} />
            <Ionicons name="cart-outline" size={50} color="rgba(255,255,255,0.3)" />
          </View>
        </View>

        {/* Footer Buttons */}
        <View style={styles.footer}>
          <Button
            title="Continue as User"
            onPress={() => navigation.navigate('Login', { role: 'user' })}
            variant="secondary"
            icon={<Ionicons name="person" size={22} color="#10b981" />}
          />

          <Button
            title="Continue as Courier"
            onPress={() => navigation.navigate('Login', { role: 'courier' })}
            variant="primary"
            icon={<Ionicons name="bicycle" size={22} color="white" />}
          />
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  heroSection: {
    alignItems: 'center',
    marginTop: 40,
  },
  iconContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
    letterSpacing: -1,
  },
  subtitle: {
    fontSize: 17,
    color: 'rgba(255, 255, 255, 0.95)',
    textAlign: 'center',
    paddingHorizontal: 16,
    lineHeight: 24,
  },
  illustrationSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  middleIcon: {
    marginHorizontal: 32,
  },
  footer: {
    gap: 16,
  },
});

export default WelcomeScreen;
