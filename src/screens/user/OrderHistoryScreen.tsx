import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS, SIZES, SHADOWS } from '../../constants/theme';
import Card from '../../components/Card';
import StatusBadge from '../../components/StatusBadge';
import { useApp } from '../../context/AppContext';

const OrderHistoryScreen = ({ navigation }) => {
  const { tasks } = useApp();
  const [filter, setFilter] = useState('all');
  const insets = useSafeAreaInsets();

  const mockTasks = tasks.length > 0 ? tasks : [
    {
      id: '1',
      type: 'send',
      pickup: '123 Makati Avenue, Makati City',
      pickupCoordinates: { latitude: 14.5547, longitude: 121.0244 },
      dropoff: '456 Quezon Avenue, Quezon City',
      dropoffCoordinates: { latitude: 14.6760, longitude: 121.0437 },
      status: 'completed',
      price: 150,
      distance: '5.2 km',
      duration: '28 mins',
      description: 'Documents delivery',
      drone: {
        id: 'DRN-001',
        model: 'Phantom X5',
        batteryLevel: 85,
        avgSpeed: 45,
      },
      createdAt: '2024-01-15 14:30',
      completedAt: '2024-01-15 15:15',
      paymentMethod: 'Cash',
    },
    {
      id: '2',
      type: 'errand',
      pickup: '789 BGC, Taguig City',
      pickupCoordinates: { latitude: 14.5507, longitude: 121.0479 },
      dropoff: '101 Ortigas, Pasig City',
      dropoffCoordinates: { latitude: 14.5871, longitude: 121.0563 },
      status: 'completed',
      price: 200,
      distance: '8.1 km',
      duration: '35 mins',
      description: 'Grocery shopping and delivery',
      drone: {
        id: 'DRN-002',
        model: 'Phantom X5',
        batteryLevel: 92,
        avgSpeed: 42,
      },
      createdAt: '2024-01-14 10:15',
      completedAt: '2024-01-14 11:05',
      paymentMethod: 'GCash',
    },
    {
      id: '3',
      type: 'multistop',
      pickup: 'SM Mall of Asia',
      pickupCoordinates: { latitude: 14.5352, longitude: 120.9820 },
      dropoff: 'Bonifacio High Street',
      dropoffCoordinates: { latitude: 14.5505, longitude: 121.0517 },
      status: 'cancelled',
      price: 180,
      distance: '12.3 km',
      stops: 2,
      description: 'Multi-stop delivery',
      drone: {
        id: 'DRN-003',
        model: 'Phantom X7',
        batteryLevel: 78,
        avgSpeed: 50,
      },
      createdAt: '2024-01-13 16:45',
      cancelledAt: '2024-01-13 17:00',
      cancellationReason: 'Customer request',
      paymentMethod: 'Cash',
    },
    {
      id: '4',
      type: 'send',
      pickup: 'Greenbelt Mall, Makati',
      pickupCoordinates: { latitude: 14.5525, longitude: 121.0199 },
      dropoff: 'Alabang Town Center, Muntinlupa',
      dropoffCoordinates: { latitude: 14.4195, longitude: 121.0396 },
      status: 'completed',
      price: 320,
      distance: '15.7 km',
      duration: '52 mins',
      description: 'Urgent package delivery',
      drone: {
        id: 'DRN-004',
        model: 'Phantom X5',
        batteryLevel: 88,
        avgSpeed: 44,
      },
      createdAt: '2024-01-12 09:30',
      completedAt: '2024-01-12 10:45',
      paymentMethod: 'GCash',
    },
    {
      id: '5',
      type: 'errand',
      pickup: 'Mercury Drug, Mandaluyong',
      pickupCoordinates: { latitude: 14.5849, longitude: 121.0564 },
      dropoff: '88 Boni Avenue, Mandaluyong',
      dropoffCoordinates: { latitude: 14.5798, longitude: 121.0522 },
      status: 'completed',
      price: 100,
      distance: '2.8 km',
      duration: '15 mins',
      description: 'Medicine pickup',
      drone: {
        id: 'DRN-005',
        model: 'Phantom X5',
        batteryLevel: 95,
        avgSpeed: 40,
      },
      createdAt: '2024-01-11 14:20',
      completedAt: '2024-01-11 14:45',
      paymentMethod: 'Cash',
    },
    {
      id: '6',
      type: 'send',
      pickup: 'Rockwell Center, Makati',
      pickupCoordinates: { latitude: 14.5650, longitude: 121.0368 },
      dropoff: 'Ortigas Center, Pasig',
      dropoffCoordinates: { latitude: 14.5866, longitude: 121.0557 },
      status: 'completed',
      price: 180,
      distance: '6.4 km',
      duration: '30 mins',
      description: 'Food delivery',
      drone: {
        id: 'DRN-006',
        model: 'Phantom X5',
        batteryLevel: 81,
        avgSpeed: 43,
      },
      createdAt: '2024-01-10 12:00',
      completedAt: '2024-01-10 12:40',
      paymentMethod: 'Card',
    },
    {
      id: '7',
      type: 'send',
      pickup: 'Century City Mall, Makati',
      pickupCoordinates: { latitude: 14.5654, longitude: 121.0351 },
      dropoff: 'SM Megamall, Mandaluyong',
      dropoffCoordinates: { latitude: 14.5849, longitude: 121.0564 },
      status: 'cancelled',
      price: 150,
      distance: '4.2 km',
      description: 'Package delivery',
      drone: {
        id: 'DRN-007',
        model: 'Phantom X5',
        batteryLevel: 90,
        avgSpeed: 46,
      },
      createdAt: '2024-01-09 16:15',
      cancelledAt: '2024-01-09 16:30',
      cancellationReason: 'Incorrect address',
      paymentMethod: 'Cash',
    },
  ];

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'completed', label: 'Completed' },
    { id: 'cancelled', label: 'Cancelled' },
  ];

  const filteredTasks = filter === 'all'
    ? mockTasks
    : mockTasks.filter(task => task.status === filter);

  const renderTaskItem = ({ item }) => (
    <Card
      style={styles.taskCard}
      onPress={() => navigation.navigate('LiveTracking', { task: item })}
    >
      <View style={styles.taskHeader}>
        <View style={styles.taskIcon}>
          <Ionicons
            name={
              item.type === 'send' ? 'cube-outline' :
              item.type === 'errand' ? 'cart-outline' :
              'navigate-outline'
            }
            size={24}
            color={COLORS.primary}
          />
        </View>
        <View style={styles.taskInfo}>
          <View style={styles.taskRow}>
            <Text style={styles.taskType}>
              {item.type === 'send' ? 'Send Item' :
               item.type === 'errand' ? 'Run Errand' :
               'Multi-stop Task'}
            </Text>
            <StatusBadge status={item.status} />
          </View>
          <Text style={styles.taskDate}>{item.createdAt}</Text>
        </View>
      </View>

      <View style={styles.taskDivider} />

      <View style={styles.locationContainer}>
        <View style={styles.locationRow}>
          <View style={styles.locationDot}>
            <Ionicons name="ellipse" size={10} color={COLORS.primary} />
          </View>
          <Text style={styles.locationText} numberOfLines={1}>
            {item.pickup}
          </Text>
        </View>

        <View style={styles.dashedLine} />

        <View style={styles.locationRow}>
          <Ionicons name="location" size={14} color={COLORS.error} />
          <Text style={styles.locationText} numberOfLines={1}>
            {item.dropoff}
          </Text>
        </View>
      </View>

      {item.drone && (
        <View style={styles.droneRow}>
          <MaterialCommunityIcons name="drone" size={16} color={COLORS.textGray} />
          <Text style={styles.droneText}>Drone ID: {item.drone.id}</Text>
        </View>
      )}

      <View style={styles.taskFooter}>
        <Text style={styles.price}>₱{item.price}</Text>
        <View style={styles.viewButton}>
          <Text style={styles.viewButtonText}>View Details</Text>
          <Ionicons name="chevron-forward" size={16} color={COLORS.primary} />
        </View>
      </View>
    </Card>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.textDark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order History</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.filterContainer}>
        {filters.map((f) => (
          <TouchableOpacity
            key={f.id}
            style={[
              styles.filterChip,
              filter === f.id && styles.filterChipActive,
            ]}
            onPress={() => setFilter(f.id)}
          >
            <Text
              style={[
                styles.filterText,
                filter === f.id && styles.filterTextActive,
              ]}
            >
              {f.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {filteredTasks.length > 0 ? (
        <FlatList
          data={filteredTasks}
          renderItem={renderTaskItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={[
            styles.listContent,
            { paddingBottom: insets.bottom > 0 ? insets.bottom + 80 : 100 }
          ]}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyState}>
          <View style={styles.emptyIcon}>
            <Ionicons name="file-tray-outline" size={64} color={COLORS.textLight} />
          </View>
          <Text style={styles.emptyTitle}>No Orders Yet</Text>
          <Text style={styles.emptySubtitle}>
            Your completed and cancelled orders will appear here
          </Text>
        </View>
      )}
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
  filterContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    paddingHorizontal: SIZES.paddingLarge,
    paddingVertical: SIZES.padding,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  filterChip: {
    flex: 1,
    height: 40,
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
  },
  filterChipActive: {
    backgroundColor: COLORS.primary,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  filterTextActive: {
    color: '#ffffff',
  },
  listContent: {
    padding: SIZES.paddingLarge,
  },
  taskCard: {
    marginBottom: SIZES.margin,
  },
  taskHeader: {
    flexDirection: 'row',
    gap: SIZES.margin,
  },
  taskIcon: {
    width: 48,
    height: 48,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  taskInfo: {
    flex: 1,
    gap: 4,
  },
  taskRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: SIZES.marginSmall,
  },
  taskType: {
    flex: 1,
    fontSize: SIZES.body,
    fontWeight: 'bold',
    color: COLORS.textDark,
  },
  taskDate: {
    fontSize: SIZES.tiny,
    color: COLORS.textLight,
  },
  taskDivider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: SIZES.margin,
  },
  locationContainer: {
    marginBottom: SIZES.marginSmall,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SIZES.marginSmall,
  },
  locationDot: {
    width: 14,
    alignItems: 'center',
  },
  locationText: {
    flex: 1,
    fontSize: SIZES.small,
    color: COLORS.textDark,
  },
  dashedLine: {
    width: 1,
    height: 16,
    marginLeft: 7,
    marginVertical: 2,
    borderLeftWidth: 1,
    borderLeftColor: COLORS.border,
    borderStyle: 'dashed',
  },
  droneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: SIZES.marginSmall,
    paddingTop: SIZES.marginSmall,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  droneText: {
    fontSize: SIZES.tiny,
    color: COLORS.textGray,
  },
  taskFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SIZES.margin,
  },
  price: {
    fontSize: SIZES.h4,
    fontWeight: 'bold',
    color: COLORS.textDark,
  },
  viewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  viewButtonText: {
    fontSize: SIZES.small,
    fontWeight: '600',
    color: COLORS.primary,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SIZES.paddingLarge * 2,
  },
  emptyIcon: {
    marginBottom: SIZES.marginLarge,
  },
  emptyTitle: {
    fontSize: SIZES.h3,
    fontWeight: 'bold',
    color: COLORS.textDark,
    marginBottom: SIZES.marginSmall,
  },
  emptySubtitle: {
    fontSize: SIZES.body,
    color: COLORS.textGray,
    textAlign: 'center',
  },
});

export default OrderHistoryScreen;
