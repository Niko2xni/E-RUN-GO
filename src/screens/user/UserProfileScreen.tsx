import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES, SHADOWS } from '../../constants/theme';
import Card from '../../components/Card';
import { useApp } from '../../context/AppContext';

const UserProfileScreen = ({ navigation }) => {
  const { user, logout } = useApp();

  const savedLocations = [
    { id: 'home', label: 'Home', address: '123 Main Street, Makati City', icon: 'home-outline' },
    { id: 'work', label: 'Work', address: '456 Business Avenue, BGC', icon: 'briefcase-outline' },
  ];

  const menuItems = [
    {
      id: 'payment',
      label: 'Payment Methods',
      icon: 'card-outline',
      onPress: () => {},
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: 'notifications-outline',
      onPress: () => {},
    },
    {
      id: 'help',
      label: 'Help & Support',
      icon: 'help-circle-outline',
      onPress: () => {},
    },
    {
      id: 'about',
      label: 'About',
      icon: 'information-circle-outline',
      onPress: () => {},
    },
    {
      id: 'terms',
      label: 'Terms & Privacy',
      icon: 'document-text-outline',
      onPress: () => {},
    },
  ];

  const handleLogout = () => {
    Alert.alert(
      'Log Out',
      'Are you sure you want to log out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Log Out',
          style: 'destructive',
          onPress: () => logout(),
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.textDark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile & Settings</Text>
        <TouchableOpacity style={styles.editButton}>
          <Ionicons name="create-outline" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Card style={styles.profileCard}>
          {user?.avatar ? (
            <Image source={{ uri: user.avatar }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Ionicons name="person" size={40} color={COLORS.white} />
            </View>
          )}
          <Text style={styles.name}>{user?.name || 'User'}</Text>
          <Text style={styles.email}>{user?.email || 'user@example.com'}</Text>
          <Text style={styles.phone}>{user?.phone || '+63 917 123 4567'}</Text>
        </Card>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Saved Locations</Text>
          {savedLocations.map((location) => (
            <Card
              key={location.id}
              style={styles.locationCard}
              onPress={() => {}}
            >
              <View style={styles.locationIcon}>
                <Ionicons name={location.icon} size={20} color={COLORS.primary} />
              </View>
              <View style={styles.locationInfo}>
                <Text style={styles.locationLabel}>{location.label}</Text>
                <Text style={styles.locationAddress} numberOfLines={1}>
                  {location.address}
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={COLORS.textGray} />
            </Card>
          ))}

          <TouchableOpacity style={styles.addLocationButton}>
            <Ionicons name="add-circle-outline" size={20} color={COLORS.primary} />
            <Text style={styles.addLocationText}>Add New Location</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          {menuItems.map((item) => (
            <Card
              key={item.id}
              style={styles.menuCard}
              onPress={item.onPress}
            >
              <View style={styles.menuIcon}>
                <Ionicons name={item.icon} size={22} color={COLORS.textDark} />
              </View>
              <Text style={styles.menuLabel}>{item.label}</Text>
              <Ionicons name="chevron-forward" size={20} color={COLORS.textGray} />
            </Card>
          ))}
        </View>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Ionicons name="log-out-outline" size={20} color={COLORS.error} />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        <Text style={styles.version}>Version 1.0.0</Text>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundGray,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SIZES.paddingLarge,
    paddingTop: 60,
    paddingBottom: SIZES.padding,
    backgroundColor: COLORS.white,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: SIZES.h3,
    fontWeight: 'bold',
    color: COLORS.textDark,
  },
  editButton: {
    padding: 4,
  },
  content: {
    flex: 1,
  },
  profileCard: {
    alignItems: 'center',
    marginHorizontal: SIZES.paddingLarge,
    marginTop: SIZES.marginLarge,
    paddingVertical: SIZES.paddingLarge,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: SIZES.margin,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SIZES.margin,
  },
  name: {
    fontSize: SIZES.h3,
    fontWeight: 'bold',
    color: COLORS.textDark,
    marginBottom: 4,
  },
  email: {
    fontSize: SIZES.small,
    color: COLORS.textGray,
    marginBottom: 2,
  },
  phone: {
    fontSize: SIZES.small,
    color: COLORS.textGray,
  },
  section: {
    marginTop: SIZES.marginLarge,
    paddingHorizontal: SIZES.paddingLarge,
  },
  sectionTitle: {
    fontSize: SIZES.h4,
    fontWeight: 'bold',
    color: COLORS.textDark,
    marginBottom: SIZES.margin,
  },
  locationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SIZES.margin,
    marginBottom: SIZES.margin,
  },
  locationIcon: {
    width: 40,
    height: 40,
    borderRadius: SIZES.radiusSmall,
    backgroundColor: COLORS.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  locationInfo: {
    flex: 1,
  },
  locationLabel: {
    fontSize: SIZES.body,
    fontWeight: '600',
    color: COLORS.textDark,
    marginBottom: 2,
  },
  locationAddress: {
    fontSize: SIZES.tiny,
    color: COLORS.textGray,
  },
  addLocationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SIZES.marginSmall,
    paddingVertical: SIZES.padding,
    borderRadius: SIZES.radius,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderStyle: 'dashed',
  },
  addLocationText: {
    fontSize: SIZES.body,
    fontWeight: '600',
    color: COLORS.primary,
  },
  menuCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SIZES.margin,
    marginBottom: SIZES.margin,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: SIZES.radiusSmall,
    backgroundColor: COLORS.backgroundGray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuLabel: {
    flex: 1,
    fontSize: SIZES.body,
    fontWeight: '500',
    color: COLORS.textDark,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SIZES.marginSmall,
    marginHorizontal: SIZES.paddingLarge,
    marginTop: SIZES.marginLarge * 2,
    paddingVertical: SIZES.padding,
    borderRadius: SIZES.radius,
    borderWidth: 1,
    borderColor: COLORS.error,
  },
  logoutText: {
    fontSize: SIZES.body,
    fontWeight: '600',
    color: COLORS.error,
  },
  version: {
    fontSize: SIZES.tiny,
    color: COLORS.textLight,
    textAlign: 'center',
    marginTop: SIZES.marginLarge,
  },
});

export default UserProfileScreen;
