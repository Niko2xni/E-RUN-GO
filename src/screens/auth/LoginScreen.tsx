import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../../constants/theme';
import { Asset } from 'expo-asset';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useApp } from '../../context/AppContext';

const LoginScreen = ({ navigation, route }) => {
  const { login } = useApp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setErrors({});

    // Simple validation
    const newErrors = {};
    if (!email) newErrors.email = 'Email is required';
    if (!password) newErrors.password = 'Password is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      const userData = {
        id: '1',
        name: 'John Doe',
        email,
        phone: '+1234567890',
        avatar: null,
      };

      login(userData);
      setLoading(false);
    }, 1000);
  };

  const handleBypass = () => {
    const userData = {
      id: '1',
      name: 'Guest User',
      email: 'guest@example.com',
      phone: '+1234567890',
      avatar: null,
    };

    login(userData);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Image 
              source={require('../../../assets/icon.png')} 
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Sign in to continue</Text>
        </View>

        <View style={styles.form}>
          <Input
            label="Email or Phone"
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email or phone"
            keyboardType="email-address"
            icon="mail-outline"
            error={errors.email}
          />

          <Input
            label="Password"
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            secureTextEntry
            icon="lock-closed-outline"
            error={errors.password}
          />

          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>

          <Button
            title="Log In"
            onPress={handleLogin}
            loading={loading}
            style={styles.loginButton}
          />

          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Don't have an account? </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Register')}
            >
              <Text style={styles.signupLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>

          {/* Bypass button for testing */}
          <View style={styles.bypassSection}>
            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>Quick Access</Text>
              <View style={styles.dividerLine} />
            </View>

            <Button
              title="Quick Login"
              onPress={handleBypass}
              variant="outline"
              icon={<MaterialCommunityIcons name="robot" size={20} color={COLORS.primary} />}
              style={styles.bypassButton}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: SIZES.paddingLarge,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    marginBottom: SIZES.marginLarge * 1.5,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: SIZES.marginLarge,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: SIZES.marginLarge,
  },
  title: {
    fontSize: SIZES.h1,
    fontWeight: 'bold',
    color: COLORS.textDark,
    marginBottom: SIZES.marginSmall,
  },
  subtitle: {
    fontSize: SIZES.body,
    color: COLORS.textGray,
  },
  form: {
    flex: 1,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: SIZES.marginLarge,
  },
  forgotPasswordText: {
    color: COLORS.primary,
    fontSize: SIZES.small,
    fontWeight: '600',
  },
  loginButton: {
    marginBottom: SIZES.marginLarge,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signupText: {
    color: COLORS.textGray,
    fontSize: SIZES.small,
  },
  signupLink: {
    color: COLORS.primary,
    fontSize: SIZES.small,
    fontWeight: 'bold',
  },
  bypassSection: {
    marginTop: SIZES.marginLarge * 1.5,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.marginLarge,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.border,
  },
  dividerText: {
    color: COLORS.textGray,
    fontSize: SIZES.small,
    paddingHorizontal: SIZES.padding,
    fontWeight: '500',
  },
  bypassButton: {
    borderWidth: 1.5,
    borderColor: COLORS.primary,
  },
});

export default LoginScreen;
