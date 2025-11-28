import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../../constants/theme';
import Card from '../../components/Card';
import StatusBadge from '../../components/StatusBadge';
import { useApp } from '../../context/AppContext';

const CourierProfileScreen = ({ navigation }) => {
  const { user, logout } = useApp();

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
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.textDark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile & Settings</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Card style={styles.profileCard}>
          <View style={styles.avatarPlaceholder}>
            <Ionicons name="person" size={40} color={COLORS.white} />
          </View>
          <Text style={styles.name}>{user?.name || 'Courier'}</Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color="#f59e0b" />
            <Text style={styles.rating}>4.8</Text>
            <Text style={styles.reviews}>(127 reviews)</Text>
          </View>
        </Card>

        <Card style={styles.vehicleCard}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Vehicle Information</Text>
            <TouchableOpacity>
              <Ionicons name="create-outline" size={20} color={COLORS.primary} />
            </TouchableOpacity>
          </View>

          <View style={styles.infoRow}>
            <Ionicons name="bicycle-outline" size={20} color={COLORS.textGray} />
            <Text style={styles.infoLabel}>Type:</Text>
            <Text style={styles.infoValue}>{user?.vehicleType || 'Motorcycle'}</Text>
          </View>

          <View style={styles.infoRow}>
            <Ionicons name="car-outline" size={20} color={COLORS.textGray} />
            <Text style={styles.infoLabel}>Plate:</Text>
            <Text style={styles.infoValue}>{user?.plateNumber || 'ABC 1234'}</Text>
          </View>
        </Card>

        <Card style={styles.verificationCard}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Verification Status</Text>
            <StatusBadge status="verified" />
          </View>

          <View style={styles.documentRow}>
            <Ionicons name="checkmark-circle" size={20} color={COLORS.success} />
            <Text style={styles.documentText}>Valid ID</Text>
          </View>

          <View style={styles.documentRow}>
            <Ionicons name="checkmark-circle" size={20} color={COLORS.success} />
            <Text style={styles.documentText}>Driver's License</Text>
          </View>

          <View style={styles.documentRow}>
            <Ionicons name="checkmark-circle" size={20} color={COLORS.success} />
            <Text style={styles.documentText}>Vehicle Registration</Text>
          </View>
        </Card>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>

          <Card style={styles.menuCard} onPress={() => navigation.navigate('CourierEarnings')}>
            <Ionicons name="wallet-outline" size={22} color={COLORS.textDark} />
            <Text style={styles.menuLabel}>Earnings & Wallet</Text>
            <Ionicons name="chevron-forward" size={20} color={COLORS.textGray} />
          </Card>

          <Card style={styles.menuCard}>
            <Ionicons name="notifications-outline" size={22} color={COLORS.textDark} />
            <Text style={styles.menuLabel}>Notifications</Text>
            <Ionicons name="chevron-forward" size={20} color={COLORS.textGray} />
          </Card>

          <Card style={styles.menuCard}>
            <Ionicons name="help-circle-outline" size={22} color={COLORS.textDark} />
            <Text style={styles.menuLabel}>Help & Support</Text>
            <Ionicons name="chevron-forward" size={20} color={COLORS.textGray} />
          </Card>

          <Card style={styles.menuCard}>
            <Ionicons name="document-text-outline" size={22} color={COLORS.textDark} />
            <Text style={styles.menuLabel}>Terms & Privacy</Text>
            <Ionicons name="chevron-forward" size={20} color={COLORS.textGray} />
          </Card>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
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
  content: {
    flex: 1,
  },
  profileCard: {
    alignItems: 'center',
    marginHorizontal: SIZES.paddingLarge,
    marginTop: SIZES.marginLarge,
    paddingVertical: SIZES.paddingLarge,
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
    marginBottom: SIZES.marginSmall,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rating: {
    fontSize: SIZES.body,
    fontWeight: 'bold',
    color: COLORS.textDark,
  },
  reviews: {
    fontSize: SIZES.small,
    color: COLORS.textGray,
  },
  vehicleCard: {
    marginHorizontal: SIZES.paddingLarge,
    marginTop: SIZES.marginLarge,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.margin,
  },
  cardTitle: {
    fontSize: SIZES.h4,
    fontWeight: 'bold',
    color: COLORS.textDark,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SIZES.marginSmall,
    marginBottom: SIZES.marginSmall,
  },
  infoLabel: {
    fontSize: SIZES.body,
    color: COLORS.textGray,
  },
  infoValue: {
    fontSize: SIZES.body,
    fontWeight: '600',
    color: COLORS.textDark,
  },
  verificationCard: {
    marginHorizontal: SIZES.paddingLarge,
    marginTop: SIZES.marginLarge,
  },
  documentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SIZES.marginSmall,
    marginBottom: SIZES.marginSmall,
  },
  documentText: {
    fontSize: SIZES.body,
    color: COLORS.textDark,
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
  menuCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SIZES.margin,
    marginBottom: SIZES.margin,
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

export default CourierProfileScreen;
