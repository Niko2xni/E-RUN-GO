import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES, SHADOWS } from '../../constants/theme';
import Card from '../../components/Card';
import Button from '../../components/Button';

const TaskDetailScreen = ({ navigation, route }) => {
  const task = {
    id: '1',
    type: 'send',
    pickup: '123 Makati Avenue, Makati City',
    pickupContact: 'John Doe - +63 917 111 2222',
    dropoff: '456 Quezon Avenue, Quezon City',
    dropoffContact: 'Jane Smith - +63 917 333 4444',
    distance: '5.2 km',
    payout: 150,
    description: 'Deliver small package - handle with care',
    notes: 'Please call when you arrive at the pickup location',
  };

  const handleAccept = () => {
    navigation.navigate('OnTrip', { taskId: task.id });
  };

  const handleDecline = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.textDark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Task Details</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: 14.5995,
              longitude: 120.9842,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker
              coordinate={{ latitude: 14.5547, longitude: 121.0244 }}
              title="Pickup"
            />
            <Marker
              coordinate={{ latitude: 14.6760, longitude: 121.0437 }}
              title="Drop-off"
            />
            <Polyline
              coordinates={[
                { latitude: 14.5547, longitude: 121.0244 },
                { latitude: 14.6760, longitude: 121.0437 },
              ]}
              strokeColor={COLORS.primary}
              strokeWidth={3}
            />
          </MapView>

          <View style={styles.distanceBadge}>
            <Ionicons name="navigate-outline" size={16} color={COLORS.white} />
            <Text style={styles.distanceText}>{task.distance}</Text>
          </View>
        </View>

        <Card style={styles.payoutCard}>
          <Text style={styles.payoutLabel}>Estimated Earning</Text>
          <Text style={styles.payoutValue}>₱{task.payout}</Text>
        </Card>

        <Card style={styles.detailsCard}>
          <Text style={styles.cardTitle}>Route Details</Text>

          <View style={styles.locationSection}>
            <View style={styles.locationHeader}>
              <Ionicons name="ellipse" size={12} color={COLORS.primary} />
              <Text style={styles.locationLabel}>Pickup Location</Text>
            </View>
            <Text style={styles.locationAddress}>{task.pickup}</Text>
            <Text style={styles.contactInfo}>{task.pickupContact}</Text>
          </View>

          <View style={styles.dashedLine} />

          <View style={styles.locationSection}>
            <View style={styles.locationHeader}>
              <Ionicons name="location" size={16} color={COLORS.error} />
              <Text style={styles.locationLabel}>Drop-off Location</Text>
            </View>
            <Text style={styles.locationAddress}>{task.dropoff}</Text>
            <Text style={styles.contactInfo}>{task.dropoffContact}</Text>
          </View>
        </Card>

        <Card style={styles.detailsCard}>
          <Text style={styles.cardTitle}>Task Information</Text>
          <Text style={styles.description}>{task.description}</Text>

          {task.notes && (
            <View style={styles.notesSection}>
              <Ionicons name="information-circle-outline" size={20} color={COLORS.primary} />
              <Text style={styles.notes}>{task.notes}</Text>
            </View>
          )}
        </Card>

        <View style={{ height: 120 }} />
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title="Decline"
          variant="outline"
          onPress={handleDecline}
          style={styles.declineButton}
        />
        <Button
          title="Accept Task"
          onPress={handleAccept}
          style={styles.acceptButton}
        />
      </View>
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
  mapContainer: {
    height: 250,
    backgroundColor: COLORS.border,
  },
  map: {
    flex: 1,
  },
  distanceBadge: {
    position: 'absolute',
    bottom: SIZES.padding,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.paddingSmall,
    borderRadius: SIZES.radiusLarge,
    gap: 6,
    ...SHADOWS.medium,
  },
  distanceText: {
    fontSize: SIZES.body,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  payoutCard: {
    marginHorizontal: SIZES.paddingLarge,
    marginTop: SIZES.marginLarge,
    alignItems: 'center',
    paddingVertical: SIZES.paddingLarge,
    backgroundColor: COLORS.primary,
  },
  payoutLabel: {
    fontSize: SIZES.small,
    color: COLORS.white,
    opacity: 0.9,
    marginBottom: 4,
  },
  payoutValue: {
    fontSize: SIZES.h1,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  detailsCard: {
    marginHorizontal: SIZES.paddingLarge,
    marginTop: SIZES.marginLarge,
  },
  cardTitle: {
    fontSize: SIZES.h4,
    fontWeight: 'bold',
    color: COLORS.textDark,
    marginBottom: SIZES.margin,
  },
  locationSection: {
    marginBottom: SIZES.margin,
  },
  locationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SIZES.marginSmall,
    marginBottom: SIZES.marginSmall,
  },
  locationLabel: {
    fontSize: SIZES.small,
    fontWeight: '600',
    color: COLORS.textGray,
  },
  locationAddress: {
    fontSize: SIZES.body,
    color: COLORS.textDark,
    fontWeight: '500',
    marginBottom: 4,
    marginLeft: 20,
  },
  contactInfo: {
    fontSize: SIZES.small,
    color: COLORS.textGray,
    marginLeft: 20,
  },
  dashedLine: {
    height: 1,
    marginVertical: SIZES.margin,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    borderStyle: 'dashed',
  },
  description: {
    fontSize: SIZES.body,
    color: COLORS.textDark,
    lineHeight: 24,
  },
  notesSection: {
    flexDirection: 'row',
    backgroundColor: COLORS.secondary,
    padding: SIZES.padding,
    borderRadius: SIZES.radiusSmall,
    gap: SIZES.marginSmall,
    marginTop: SIZES.margin,
  },
  notes: {
    flex: 1,
    fontSize: SIZES.small,
    color: COLORS.primary,
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    paddingHorizontal: SIZES.paddingLarge,
    paddingVertical: SIZES.padding,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    gap: SIZES.margin,
  },
  declineButton: {
    flex: 1,
  },
  acceptButton: {
    flex: 2,
  },
});

export default TaskDetailScreen;
