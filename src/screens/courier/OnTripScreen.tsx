import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES, SHADOWS } from '../../constants/theme';
import Card from '../../components/Card';
import Button from '../../components/Button';

const OnTripScreen = ({ navigation, route }) => {
  const [currentStep, setCurrentStep] = useState('go_to_pickup');

  const task = {
    id: '1',
    pickup: '123 Makati Avenue, Makati City',
    pickupContact: '+63 917 111 2222',
    dropoff: '456 Quezon Avenue, Quezon City',
    dropoffContact: '+63 917 333 4444',
    payout: 150,
  };

  const steps = [
    { id: 'go_to_pickup', label: 'Go to Pickup Location', action: 'Arrived at Pickup' },
    { id: 'pick_up', label: 'Pick up Item', action: 'Item Picked Up' },
    { id: 'go_to_dropoff', label: 'Go to Drop-off Location', action: 'Arrived at Destination' },
    { id: 'complete', label: 'Complete Delivery', action: 'Complete Task' },
  ];

  const currentStepIndex = steps.findIndex(s => s.id === currentStep);
  const currentStepData = steps[currentStepIndex];

  const handleStepAction = () => {
    if (currentStep === 'complete') {
      navigation.navigate('TaskCompletion', { taskId: task.id });
    } else {
      const nextStep = steps[currentStepIndex + 1];
      if (nextStep) {
        setCurrentStep(nextStep.id);
      }
    }
  };

  const handleCall = (phone) => {
    Linking.openURL(`tel:${phone}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>On Trip</Text>
        <View style={{ width: 24 }} />
      </View>

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
          <Marker
            coordinate={{ latitude: 14.6199, longitude: 121.0320 }}
            title="Your Location"
          >
            <View style={styles.courierMarker}>
              <Ionicons name="bicycle" size={20} color={COLORS.white} />
            </View>
          </Marker>
          <Polyline
            coordinates={[
              { latitude: 14.5547, longitude: 121.0244 },
              { latitude: 14.6199, longitude: 121.0320 },
              { latitude: 14.6760, longitude: 121.0437 },
            ]}
            strokeColor={COLORS.primary}
            strokeWidth={3}
          />
        </MapView>
      </View>

      <View style={styles.bottomSheet}>
        <View style={styles.progressBar}>
          {steps.map((step, index) => (
            <View
              key={step.id}
              style={[
                styles.progressDot,
                index <= currentStepIndex && styles.progressDotActive,
              ]}
            />
          ))}
        </View>

        <Card style={styles.stepCard}>
          <Text style={styles.stepTitle}>{currentStepData.label}</Text>

          {currentStep === 'go_to_pickup' || currentStep === 'pick_up' ? (
            <>
              <View style={styles.locationRow}>
                <Ionicons name="location-outline" size={20} color={COLORS.primary} />
                <View style={styles.locationInfo}>
                  <Text style={styles.locationLabel}>Pickup</Text>
                  <Text style={styles.locationAddress}>{task.pickup}</Text>
                </View>
                <TouchableOpacity
                  style={styles.callButton}
                  onPress={() => handleCall(task.pickupContact)}
                >
                  <Ionicons name="call" size={20} color={COLORS.primary} />
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <>
              <View style={styles.locationRow}>
                <Ionicons name="location" size={20} color={COLORS.error} />
                <View style={styles.locationInfo}>
                  <Text style={styles.locationLabel}>Drop-off</Text>
                  <Text style={styles.locationAddress}>{task.dropoff}</Text>
                </View>
                <TouchableOpacity
                  style={styles.callButton}
                  onPress={() => handleCall(task.dropoffContact)}
                >
                  <Ionicons name="call" size={20} color={COLORS.primary} />
                </TouchableOpacity>
              </View>
            </>
          )}

          <View style={styles.payoutInfo}>
            <Ionicons name="wallet-outline" size={20} color={COLORS.primary} />
            <Text style={styles.payoutText}>You'll earn ₱{task.payout}</Text>
          </View>
        </Card>

        <View style={styles.footer}>
          <Button
            title={currentStepData.action}
            onPress={handleStepAction}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SIZES.paddingLarge,
    paddingTop: 60,
    paddingBottom: SIZES.padding,
    zIndex: 10,
    backgroundColor: 'rgba(16, 185, 129, 0.9)',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: SIZES.h4,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  courierMarker: {
    backgroundColor: COLORS.primary,
    padding: 8,
    borderRadius: 20,
    ...SHADOWS.large,
  },
  bottomSheet: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: SIZES.radiusLarge * 1.5,
    borderTopRightRadius: SIZES.radiusLarge * 1.5,
    paddingTop: SIZES.padding,
    ...SHADOWS.large,
  },
  progressBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: SIZES.marginSmall,
    marginBottom: SIZES.marginLarge,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.border,
  },
  progressDotActive: {
    backgroundColor: COLORS.primary,
    width: 24,
  },
  stepCard: {
    marginHorizontal: SIZES.paddingLarge,
    marginBottom: SIZES.margin,
  },
  stepTitle: {
    fontSize: SIZES.h3,
    fontWeight: 'bold',
    color: COLORS.textDark,
    marginBottom: SIZES.marginLarge,
  },
  locationRow: {
    flexDirection: 'row',
    gap: SIZES.margin,
    marginBottom: SIZES.margin,
  },
  locationInfo: {
    flex: 1,
  },
  locationLabel: {
    fontSize: SIZES.tiny,
    color: COLORS.textGray,
    marginBottom: 4,
  },
  locationAddress: {
    fontSize: SIZES.body,
    fontWeight: '500',
    color: COLORS.textDark,
  },
  callButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  payoutInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SIZES.marginSmall,
    backgroundColor: COLORS.secondary,
    padding: SIZES.padding,
    borderRadius: SIZES.radiusSmall,
    marginTop: SIZES.margin,
  },
  payoutText: {
    fontSize: SIZES.body,
    fontWeight: '600',
    color: COLORS.primary,
  },
  footer: {
    paddingHorizontal: SIZES.paddingLarge,
    paddingBottom: SIZES.paddingLarge,
  },
});

export default OnTripScreen;
