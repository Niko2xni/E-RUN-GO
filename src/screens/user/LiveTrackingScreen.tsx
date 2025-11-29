import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Linking,
} from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SIZES, SHADOWS } from '../../constants/theme';
import Card from '../../components/Card';
import StatusBadge from '../../components/StatusBadge';
import Button from '../../components/Button';
import { useApp } from '../../context/AppContext';

const LiveTrackingScreen = ({ navigation, route }) => {
  const { currentTask } = useApp();
  const [activeTab, setActiveTab] = useState('tracking');

  // Use task from route params or fallback to currentTask or default
  const task = route?.params?.task || currentTask || {
    id: '1',
    type: 'send',
    pickup: '123 Makati Avenue, Makati City',
    pickupCoordinates: { latitude: 14.5547, longitude: 121.0244 },
    dropoff: '456 Quezon Avenue, Quezon City',
    dropoffCoordinates: { latitude: 14.6760, longitude: 121.0437 },
    status: 'in_transit',
    drone: {
      id: 'DRN-001',
      model: 'Phantom X5',
      batteryLevel: 85,
      altitude: 120,
      speed: 45,
      currentLocation: { latitude: 14.6199, longitude: 121.0320 },
    },
    distance: '5.2 km',
    remainingDistance: '2.1 km',
    eta: '12 min',
    price: 150,
    description: 'Deliver small package',
    createdAt: '2024-01-15 14:30',
    paymentMethod: 'Cash on Delivery',
  };

  const statusSteps = [
    { status: 'searching', label: 'Preparing drone' },
    { status: 'accepted', label: 'Drone dispatched' },
    { status: 'pickup', label: 'Flying to pickup' },
    { status: 'in_transit', label: 'Item picked up' },
    { status: 'completed', label: 'Delivered' },
  ];

  const currentStatusIndex = statusSteps.findIndex(
    item => item.status === task.status
  );

  const statusTimeline = statusSteps.map((step, index) => ({
    ...step,
    completed: index <= currentStatusIndex,
  }));

  const handleSupport = () => {
    // Open support contact
    Linking.openURL('tel:+639171234567');
  };

  const handleCancel = () => {
    // Show cancel confirmation
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Live Tracking</Text>
        <TouchableOpacity style={styles.menuButton}>
          <Ionicons name="ellipsis-vertical" size={24} color={COLORS.white} />
        </TouchableOpacity>
      </View>

      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: task.drone?.currentLocation?.latitude || task.pickupCoordinates.latitude,
            longitude: task.drone?.currentLocation?.longitude || task.pickupCoordinates.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {/* Pickup Marker */}
          <Marker
            coordinate={task.pickupCoordinates}
            title="Pickup"
            description={task.pickup}
          />

          {/* Dropoff Marker */}
          <Marker
            coordinate={task.dropoffCoordinates}
            title="Drop-off"
            description={task.dropoff}
          />

          {/* Drone Location Marker */}
          {task.drone?.currentLocation && (
            <Marker
              coordinate={task.drone.currentLocation}
              title="Drone Location"
              description={task.drone.model}
            >
              <View style={styles.droneMarkerContainer}>
                <View style={styles.dronePulse} />
                <View style={styles.droneIcon}>
                  <MaterialCommunityIcons
                    name="drone"
                    size={20}
                    color={COLORS.white}
                  />
                </View>
              </View>
            </Marker>
          )}

          {/* Route Polyline */}
          {task.drone?.currentLocation && (
            <Polyline
              coordinates={[
                task.pickupCoordinates,
                task.drone.currentLocation,
                task.dropoffCoordinates,
              ]}
              strokeColor={COLORS.primary}
              strokeWidth={3}
            />
          )}
        </MapView>

        <View style={styles.etaBadge}>
          <Ionicons name="time-outline" size={16} color={COLORS.white} />
          <Text style={styles.etaText}>ETA: {task.eta || '15 min'}</Text>
        </View>
      </View>

      <View style={styles.bottomSheet}>
        <View style={styles.sheetHandle} />

        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'tracking' && styles.tabActive]}
            onPress={() => setActiveTab('tracking')}
          >
            <Text style={[styles.tabText, activeTab === 'tracking' && styles.tabTextActive]}>
              Tracking
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'details' && styles.tabActive]}
            onPress={() => setActiveTab('details')}
          >
            <Text style={[styles.tabText, activeTab === 'details' && styles.tabTextActive]}>
              Details
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.sheetContent}
          showsVerticalScrollIndicator={false}
        >
          {activeTab === 'tracking' ? (
            <>
              {task.drone && (
                <Card style={styles.droneCard}>
                  <View style={styles.droneHeader}>
                    <View style={styles.droneInfo}>
                      <View style={styles.droneAvatar}>
                        <MaterialCommunityIcons name="drone" size={32} color={COLORS.white} />
                      </View>
                      <View style={styles.droneDetails}>
                        <Text style={styles.droneName}>{task.drone.model}</Text>
                        <Text style={styles.droneId}>ID: {task.drone.id}</Text>
                      </View>
                    </View>

                    <View style={styles.droneStats}>
                      <View style={styles.statItem}>
                        <Ionicons name="battery-half" size={16} color={COLORS.success} />
                        <Text style={styles.statText}>{task.drone.batteryLevel}%</Text>
                      </View>
                      <View style={styles.statItem}>
                        <Ionicons name="speedometer" size={16} color={COLORS.primary} />
                        <Text style={styles.statText}>{task.drone.speed} km/h</Text>
                      </View>
                    </View>
                  </View>
                </Card>
              )}

              <View style={styles.timelineContainer}>
                <Text style={styles.timelineTitle}>Order Status</Text>
                {statusTimeline.map((item, index) => (
                  <View key={item.status} style={styles.timelineItem}>
                    <View style={styles.timelineIconContainer}>
                      <View
                        style={[
                          styles.timelineIcon,
                          item.completed && styles.timelineIconCompleted,
                          currentStatusIndex === index && styles.timelineIconActive,
                        ]}
                      >
                        {item.completed && (
                          <Ionicons name="checkmark" size={16} color={COLORS.white} />
                        )}
                      </View>
                      {index < statusTimeline.length - 1 && (
                        <View
                          style={[
                            styles.timelineLine,
                            item.completed && styles.timelineLineCompleted,
                          ]}
                        />
                      )}
                    </View>
                    <View style={styles.timelineContent}>
                      <Text
                        style={[
                          styles.timelineLabel,
                          item.completed && styles.timelineLabelCompleted,
                        ]}
                      >
                        {item.label}
                      </Text>
                      {currentStatusIndex === index && (
                        <Text style={styles.timelineTime}>In progress</Text>
                      )}
                    </View>
                  </View>
                ))}
              </View>
            </>
          ) : (
            <>
              <Card style={styles.detailsCard}>
                <Text style={styles.detailsTitle}>Task Information</Text>

                <View style={styles.detailRow}>
                  <View style={styles.detailIcon}>
                    <Ionicons name="ellipse" size={12} color={COLORS.primary} />
                  </View>
                  <View style={styles.detailContent}>
                    <Text style={styles.detailLabel}>Pickup</Text>
                    <Text style={styles.detailValue}>{task.pickup}</Text>
                  </View>
                </View>

                <View style={styles.dashedLine} />

                <View style={styles.detailRow}>
                  <View style={styles.detailIcon}>
                    <Ionicons name="location" size={16} color={COLORS.error} />
                  </View>
                  <View style={styles.detailContent}>
                    <Text style={styles.detailLabel}>Drop-off</Text>
                    <Text style={styles.detailValue}>{task.dropoff}</Text>
                  </View>
                </View>
              </Card>

              <Card style={styles.detailsCard}>
                <Text style={styles.detailsTitle}>Payment</Text>
                <View style={styles.paymentRow}>
                  <Text style={styles.paymentLabel}>Total Amount</Text>
                  <Text style={styles.paymentValue}>₱{task.price}</Text>
                </View>
                <View style={styles.paymentRow}>
                  <Text style={styles.paymentLabel}>Payment Method</Text>
                  <Text style={styles.paymentMethod}>Cash on Delivery</Text>
                </View>
              </Card>
            </>
          )}
        </ScrollView>

        {task.status !== 'completed' && task.status !== 'cancelled' && (
          <View style={styles.footer}>
            <Button
              title="Cancel Request"
              variant="outline"
              onPress={handleCancel}
            />
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SIZES.paddingLarge,
    paddingTop: 60,
    paddingBottom: SIZES.padding,
    backgroundColor: COLORS.primary,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: SIZES.h4,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  menuButton: {
    padding: 4,
  },
  mapContainer: {
    height: 450,
    position: 'relative',
  },
  map: {
    flex: 1,
  },
  droneMarkerContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dronePulse: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.primary,
    opacity: 0.2,
  },
  droneIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.large,
  },
  etaBadge: {
    position: 'absolute',
    top: 20,
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
  etaText: {
    fontSize: SIZES.body,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  bottomSheet: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: SIZES.radiusLarge * 1.5,
    borderTopRightRadius: SIZES.radiusLarge * 1.5,
    paddingTop: SIZES.paddingSmall,
    paddingBottom: 100,
    ...SHADOWS.large,
  },
  sheetHandle: {
    width: 40,
    height: 4,
    backgroundColor: COLORS.border,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: SIZES.margin,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: SIZES.paddingLarge,
    marginBottom: SIZES.margin,
    gap: SIZES.margin,
  },
  tab: {
    flex: 1,
    paddingVertical: SIZES.paddingSmall,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: COLORS.border,
  },
  tabActive: {
    borderBottomColor: COLORS.primary,
  },
  tabText: {
    fontSize: SIZES.body,
    fontWeight: '600',
    color: COLORS.textGray,
  },
  tabTextActive: {
    color: COLORS.primary,
  },
  sheetContent: {
    paddingHorizontal: SIZES.paddingLarge,
  },
  droneCard: {
    marginBottom: SIZES.margin,
  },
  droneHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  droneInfo: {
    flexDirection: 'row',
    flex: 1,
    gap: SIZES.margin,
  },
  droneAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  droneDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  droneName: {
    fontSize: SIZES.h4,
    fontWeight: 'bold',
    color: COLORS.textDark,
    marginBottom: 4,
  },
  droneId: {
    fontSize: SIZES.small,
    color: COLORS.textGray,
  },
  droneStats: {
    gap: SIZES.marginSmall,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: SIZES.small,
    fontWeight: '600',
    color: COLORS.textDark,
  },
  timelineContainer: {
    marginBottom: SIZES.marginLarge,
  },
  timelineTitle: {
    fontSize: SIZES.h4,
    fontWeight: 'bold',
    color: COLORS.textDark,
    marginBottom: SIZES.margin,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: SIZES.margin,
  },
  timelineIconContainer: {
    alignItems: 'center',
    marginRight: SIZES.margin,
  },
  timelineIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timelineIconCompleted: {
    backgroundColor: COLORS.primary,
  },
  timelineIconActive: {
    backgroundColor: COLORS.primary,
    borderWidth: 3,
    borderColor: COLORS.secondary,
  },
  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: COLORS.border,
    marginTop: 4,
  },
  timelineLineCompleted: {
    backgroundColor: COLORS.primary,
  },
  timelineContent: {
    flex: 1,
    paddingTop: 2,
  },
  timelineLabel: {
    fontSize: SIZES.body,
    color: COLORS.textGray,
  },
  timelineLabelCompleted: {
    color: COLORS.textDark,
    fontWeight: '600',
  },
  timelineTime: {
    fontSize: SIZES.tiny,
    color: COLORS.primary,
    marginTop: 2,
  },
  detailsCard: {
    marginBottom: SIZES.margin,
  },
  detailsTitle: {
    fontSize: SIZES.h4,
    fontWeight: 'bold',
    color: COLORS.textDark,
    marginBottom: SIZES.margin,
  },
  detailRow: {
    flexDirection: 'row',
    gap: SIZES.margin,
  },
  detailIcon: {
    paddingTop: 2,
  },
  detailContent: {
    flex: 1,
  },
  detailLabel: {
    fontSize: SIZES.tiny,
    color: COLORS.textGray,
    marginBottom: 4,
  },
  detailValue: {
    fontSize: SIZES.body,
    color: COLORS.textDark,
    fontWeight: '500',
  },
  dashedLine: {
    height: 30,
    marginLeft: 6,
    marginVertical: 4,
    borderLeftWidth: 1,
    borderLeftColor: COLORS.border,
    borderStyle: 'dashed',
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SIZES.marginSmall,
  },
  paymentLabel: {
    fontSize: SIZES.body,
    color: COLORS.textGray,
  },
  paymentValue: {
    fontSize: SIZES.h3,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  paymentMethod: {
    fontSize: SIZES.body,
    fontWeight: '600',
    color: COLORS.textDark,
  },
  footer: {
    paddingHorizontal: SIZES.paddingLarge,
    paddingVertical: SIZES.padding,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
});

export default LiveTrackingScreen;
