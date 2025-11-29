import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Button from '../../components/Button';

const WelcomeScreen = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();

  return (
    <LinearGradient
      colors={['#10b981', '#059669']}
      style={styles.gradient}
    >
      <View style={[styles.container, { paddingTop: insets.top > 0 ? insets.top + 20 : 60 }]}>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <View style={styles.iconContainer}>
            <Image
              source={require('../../../assets/icon.png')}
              style={styles.appIcon}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.title}>E-Run Go</Text>
          <Text style={styles.subtitle}>
            Fast drone delivery at your fingertips
          </Text>
        </View>

        {/* Illustration Section */}
        <View style={styles.illustrationSection}>
          <View style={styles.iconRow}>
            <Ionicons name="cube-outline" size={50} color="rgba(255,255,255,0.3)" />
            <Ionicons name="location-outline" size={50} color="rgba(255,255,255,0.3)" style={styles.middleIcon} />
            <MaterialCommunityIcons name="drone" size={50} color="rgba(255,255,255,0.3)" />
          </View>
        </View>

        {/* Footer Buttons */}
        <View style={[styles.footer, { paddingBottom: insets.bottom > 0 ? insets.bottom + 20 : 40 }]}>
          <Button
            title="Get Started"
            onPress={() => navigation.navigate('Login')}
            variant="secondary"
            icon={<Ionicons name="arrow-forward" size={22} color="#10b981" />}
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
  appIcon: {
    width: 90,
    height: 90,
    borderRadius: 20,
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
