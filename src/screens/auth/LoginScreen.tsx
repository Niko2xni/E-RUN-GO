import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../../constants/theme';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useApp } from '../../context/AppContext';

const LoginScreen = ({ navigation, route }) => {
  const { login } = useApp();
  const initialRole = route?.params?.role || 'user';

  const [role, setRole] = useState(initialRole);
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
        name: role === 'user' ? 'John Doe' : 'Mike Wilson',
        email,
        phone: '+1234567890',
        avatar: null,
      };

      login(userData, role);
      setLoading(false);
    }, 1000);
  };

  const handleBypass = (bypassRole: string) => {
    const userData = {
      id: '1',
      name: bypassRole === 'user' ? 'Guest User' : 'Guest Courier',
      email: 'guest@example.com',
      phone: '+1234567890',
      avatar: null,
    };

    login(userData, bypassRole);
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
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color={COLORS.textDark} />
          </TouchableOpacity>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Sign in to continue</Text>
        </View>

        <View style={styles.roleSelector}>
          <TouchableOpacity
            style={[
              styles.roleButton,
              role === 'user' && styles.roleButtonActive,
            ]}
            onPress={() => setRole('user')}
          >
            <Ionicons
              name="person-outline"
              size={20}
              color={role === 'user' ? COLORS.white : COLORS.textGray}
            />
            <Text
              style={[
                styles.roleButtonText,
                role === 'user' && styles.roleButtonTextActive,
              ]}
            >
              User
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.roleButton,
              role === 'courier' && styles.roleButtonActive,
            ]}
            onPress={() => setRole('courier')}
          >
            <Ionicons
              name="bicycle-outline"
              size={20}
              color={role === 'courier' ? COLORS.white : COLORS.textGray}
            />
            <Text
              style={[
                styles.roleButtonText,
                role === 'courier' && styles.roleButtonTextActive,
              ]}
            >
              Courier
            </Text>
          </TouchableOpacity>
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
              onPress={() => navigation.navigate('Register', { role })}
            >
              <Text style={styles.signupLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>

          {/* Bypass buttons for testing */}
          <View style={styles.bypassSection}>
            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>Quick Access</Text>
              <View style={styles.dividerLine} />
            </View>

            <View style={styles.bypassButtons}>
              <Button
                title="Bypass as User"
                onPress={() => handleBypass('user')}
                variant="outline"
                icon={<Ionicons name="person-outline" size={20} color={COLORS.primary} />}
                style={styles.bypassButton}
              />
              <Button
                title="Bypass as Courier"
                onPress={() => handleBypass('courier')}
                variant="outline"
                icon={<Ionicons name="bicycle-outline" size={20} color={COLORS.primary} />}
                style={styles.bypassButton}
              />
            </View>
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
  backButton: {
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
  roleSelector: {
    flexDirection: 'row',
    gap: SIZES.margin,
    marginBottom: SIZES.marginLarge,
  },
  roleButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SIZES.padding,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.backgroundGray,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: SIZES.marginSmall,
  },
  roleButtonActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  roleButtonText: {
    fontSize: SIZES.small,
    fontWeight: '600',
    color: COLORS.textGray,
  },
  roleButtonTextActive: {
    color: COLORS.white,
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
  bypassButtons: {
    gap: SIZES.margin,
  },
  bypassButton: {
    borderWidth: 1.5,
    borderColor: COLORS.primary,
  },
});

export default LoginScreen;
