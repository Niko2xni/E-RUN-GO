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
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { COLORS, SIZES } from '../../constants/theme';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useApp } from '../../context/AppContext';

const RegisterScreen = ({ navigation, route }) => {
  const { login } = useApp();
  const initialRole = route?.params?.role || 'user';

  const [role, setRole] = useState(initialRole);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [plateNumber, setPlateNumber] = useState('');
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setProfilePhoto(result.assets[0].uri);
    }
  };

  const handleRegister = async () => {
    setErrors({});

    // Simple validation
    const newErrors = {};
    if (!name) newErrors.name = 'Name is required';
    if (!email) newErrors.email = 'Email is required';
    if (!phone) newErrors.phone = 'Phone is required';
    if (!password) newErrors.password = 'Password is required';
    if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

    if (role === 'courier') {
      if (!vehicleType) newErrors.vehicleType = 'Vehicle type is required';
      if (!plateNumber) newErrors.plateNumber = 'Plate number is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      const userData = {
        id: '1',
        name,
        email,
        phone,
        avatar: profilePhoto,
        ...(role === 'courier' && { vehicleType, plateNumber }),
      };

      login(userData, role);
      setLoading(false);
    }, 1000);
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
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Sign up to get started</Text>
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

        {role === 'courier' && (
          <TouchableOpacity style={styles.photoContainer} onPress={pickImage}>
            {profilePhoto ? (
              <Image source={{ uri: profilePhoto }} style={styles.photo} />
            ) : (
              <View style={styles.photoPlaceholder}>
                <Ionicons name="camera-outline" size={32} color={COLORS.textGray} />
                <Text style={styles.photoText}>Add Photo</Text>
              </View>
            )}
          </TouchableOpacity>
        )}

        <View style={styles.form}>
          <Input
            label="Full Name"
            value={name}
            onChangeText={setName}
            placeholder="Enter your full name"
            icon="person-outline"
            error={errors.name}
          />

          <Input
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            keyboardType="email-address"
            icon="mail-outline"
            error={errors.email}
          />

          <Input
            label="Phone Number"
            value={phone}
            onChangeText={setPhone}
            placeholder="Enter your phone number"
            keyboardType="phone-pad"
            icon="call-outline"
            error={errors.phone}
          />

          {role === 'courier' && (
            <>
              <Input
                label="Vehicle Type"
                value={vehicleType}
                onChangeText={setVehicleType}
                placeholder="e.g., Motorcycle, Bicycle, Car"
                icon="bicycle-outline"
                error={errors.vehicleType}
              />

              <Input
                label="Plate Number"
                value={plateNumber}
                onChangeText={setPlateNumber}
                placeholder="Enter vehicle plate number"
                icon="car-outline"
                error={errors.plateNumber}
              />
            </>
          )}

          <Input
            label="Password"
            value={password}
            onChangeText={setPassword}
            placeholder="Create a password"
            secureTextEntry
            icon="lock-closed-outline"
            error={errors.password}
          />

          <Input
            label="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Confirm your password"
            secureTextEntry
            icon="lock-closed-outline"
            error={errors.confirmPassword}
          />

          {role === 'courier' && (
            <View style={styles.verificationNote}>
              <Ionicons name="information-circle-outline" size={20} color={COLORS.primary} />
              <Text style={styles.verificationText}>
                Your account will be pending verification after registration
              </Text>
            </View>
          )}

          <Button
            title="Sign Up"
            onPress={handleRegister}
            loading={loading}
            style={styles.registerButton}
          />

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login', { role })}>
              <Text style={styles.loginLink}>Log In</Text>
            </TouchableOpacity>
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
    marginBottom: SIZES.marginLarge,
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
  photoContainer: {
    alignSelf: 'center',
    marginBottom: SIZES.marginLarge,
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  photoPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.backgroundGray,
    borderWidth: 2,
    borderColor: COLORS.border,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoText: {
    fontSize: SIZES.tiny,
    color: COLORS.textGray,
    marginTop: 4,
  },
  form: {
    flex: 1,
  },
  verificationNote: {
    flexDirection: 'row',
    backgroundColor: COLORS.secondary,
    padding: SIZES.paddingSmall,
    borderRadius: SIZES.radiusSmall,
    marginBottom: SIZES.margin,
    gap: SIZES.marginSmall,
  },
  verificationText: {
    flex: 1,
    fontSize: SIZES.tiny,
    color: COLORS.primary,
  },
  registerButton: {
    marginBottom: SIZES.marginLarge,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loginText: {
    color: COLORS.textGray,
    fontSize: SIZES.small,
  },
  loginLink: {
    color: COLORS.primary,
    fontSize: SIZES.small,
    fontWeight: 'bold',
  },
});

export default RegisterScreen;
