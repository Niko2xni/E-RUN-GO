import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES, SHADOWS } from '../../constants/theme';
import Card from '../../components/Card';
import { useApp } from '../../context/AppContext';

const CourierDashboardScreen = ({ navigation }) => {
  const { user, courierOnline, toggleCourierOnline } = useApp();

  const todayStats = {
    earnings: 1250,
    completedTasks: 8,
    activeHours: 6.5,
  };

  const availableTasks = [
    {
      id: '1',
      type: 'send',
      pickup: '123 Makati Avenue, Makati City',
      dropoff: '456 Quezon Avenue, Quezon City',
      distance: '5.2 km',
      payout: 150,
      description: 'Deliver small package',
    },
    {
      id: '2',
      type: 'errand',
      pickup: '789 BGC, Taguig City',
      dropoff: '101 Ortigas, Pasig City',
      distance: '8.1 km',
      payout: 200,
      description: 'Buy groceries from supermarket',
    },
    {
      id: '3',
      type: 'multistop',
      pickup: 'SM Mall of Asia',
      dropoff: 'Bonifacio High Street',
      stops: 2,
      distance: '12.3 km',
      payout: 280,
      description: 'Multi-stop delivery',
    },
  ];

  const renderTaskCard = ({ item }) => (
    <Card
      style={styles.taskCard}
      onPress={() => navigation.navigate('TaskDetail', { taskId: item.id })}
    >
      <View style={styles.taskHeader}>
        <View style={styles.taskTypeIcon}>
          <Ionicons
            name={
              item.type === 'send' ? 'cube-outline' :
              item.type === 'errand' ? 'cart-outline' :
              'navigate-outline'
            }
            size={20}
            color={COLORS.primary}
          />
        </View>
        <Text style={styles.taskDescription} numberOfLines={1}>
          {item.description}
        </Text>
        <View style={styles.payoutBadge}>
          <Text style={styles.payoutText}>₱{item.payout}</Text>
        </View>
      </View>

      <View style={styles.locationContainer}>
        <View style={styles.locationRow}>
          <Ionicons name="ellipse" size={8} color={COLORS.primary} />
          <Text style={styles.locationText} numberOfLines={1}>
            {item.pickup}
          </Text>
        </View>

        <View style={styles.dashedLine} />

        <View style={styles.locationRow}>
          <Ionicons name="location" size={12} color={COLORS.error} />
          <Text style={styles.locationText} numberOfLines={1}>
            {item.dropoff}
          </Text>
        </View>
      </View>

      <View style={styles.taskFooter}>
        <View style={styles.distanceContainer}>
          <Ionicons name="navigate-outline" size={14} color={COLORS.textGray} />
          <Text style={styles.distanceText}>{item.distance}</Text>
        </View>
        {item.stops && (
          <View style={styles.stopsContainer}>
            <Ionicons name="location-outline" size={14} color={COLORS.textGray} />
            <Text style={styles.stopsText}>{item.stops} stops</Text>
          </View>
        )}
        <TouchableOpacity
          style={styles.viewDetailsButton}
          onPress={() => navigation.navigate('TaskDetail', { taskId: item.id })}
        >
          <Text style={styles.viewDetailsText}>View Details</Text>
        </TouchableOpacity>
      </View>
    </Card>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.greeting}>Hi, {user?.name?.split(' ')[0] || 'Courier'}</Text>
          <Text style={styles.subtitle}>Ready to earn today?</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('CourierProfile')}>
          <View style={styles.avatarPlaceholder}>
            <Ionicons name="person" size={24} color={COLORS.white} />
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Card style={styles.statusCard}>
          <View style={styles.statusHeader}>
            <View>
              <Text style={styles.statusTitle}>Online Status</Text>
              <Text style={styles.statusSubtitle}>
                {courierOnline
                  ? 'You are online and ready to receive tasks'
                  : 'You are offline. Go online to receive requests'}
              </Text>
            </View>
            <Switch
              value={courierOnline}
              onValueChange={toggleCourierOnline}
              trackColor={{ false: COLORS.border, true: COLORS.primaryLight }}
              thumbColor={courierOnline ? COLORS.primary : COLORS.textLight}
            />
          </View>
        </Card>

        <View style={styles.statsContainer}>
          <Card style={styles.statCard}>
            <View style={styles.statIcon}>
              <Ionicons name="wallet-outline" size={24} color={COLORS.primary} />
            </View>
            <Text style={styles.statValue}>₱{todayStats.earnings}</Text>
            <Text style={styles.statLabel}>Today's Earnings</Text>
          </Card>

          <Card style={styles.statCard}>
            <View style={styles.statIcon}>
              <Ionicons name="checkmark-circle-outline" size={24} color={COLORS.success} />
            </View>
            <Text style={styles.statValue}>{todayStats.completedTasks}</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </Card>

          <Card style={styles.statCard}>
            <View style={styles.statIcon}>
              <Ionicons name="time-outline" size={24} color="#8b5cf6" />
            </View>
            <Text style={styles.statValue}>{todayStats.activeHours}h</Text>
            <Text style={styles.statLabel}>Active Hours</Text>
          </Card>
        </View>

        {courierOnline && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Available Tasks</Text>
              <TouchableOpacity>
                <Ionicons name="options-outline" size={20} color={COLORS.primary} />
              </TouchableOpacity>
            </View>

            {availableTasks.length > 0 ? (
              <FlatList
                data={availableTasks}
                renderItem={renderTaskCard}
                keyExtractor={(item) => item.id}
                scrollEnabled={false}
              />
            ) : (
              <Card style={styles.emptyCard}>
                <Ionicons name="cube-outline" size={48} color={COLORS.textLight} />
                <Text style={styles.emptyText}>No tasks available</Text>
                <Text style={styles.emptySubtext}>
                  We'll notify you when new tasks arrive
                </Text>
              </Card>
            )}
          </View>
        )}

        {!courierOnline && (
          <Card style={styles.offlineCard}>
            <Ionicons name="pause-circle-outline" size={64} color={COLORS.textLight} />
            <Text style={styles.offlineTitle}>You're Offline</Text>
            <Text style={styles.offlineSubtitle}>
              Turn on your status above to start receiving delivery requests
            </Text>
          </Card>
        )}

        <View style={{ height: 100 }} />
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SIZES.paddingLarge,
    paddingTop: 60,
    paddingBottom: SIZES.padding,
    backgroundColor: COLORS.white,
  },
  headerLeft: {
    flex: 1,
  },
  greeting: {
    fontSize: SIZES.h2,
    fontWeight: 'bold',
    color: COLORS.textDark,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: SIZES.small,
    color: COLORS.textGray,
  },
  avatarPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
  },
  statusCard: {
    marginHorizontal: SIZES.paddingLarge,
    marginTop: SIZES.marginLarge,
  },
  statusHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusTitle: {
    fontSize: SIZES.h4,
    fontWeight: 'bold',
    color: COLORS.textDark,
    marginBottom: 4,
  },
  statusSubtitle: {
    fontSize: SIZES.tiny,
    color: COLORS.textGray,
    maxWidth: '80%',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: SIZES.paddingLarge,
    marginTop: SIZES.marginLarge,
    gap: SIZES.margin,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: SIZES.paddingLarge,
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SIZES.marginSmall,
  },
  statValue: {
    fontSize: SIZES.h3,
    fontWeight: 'bold',
    color: COLORS.textDark,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: SIZES.tiny,
    color: COLORS.textGray,
    textAlign: 'center',
  },
  section: {
    marginTop: SIZES.marginLarge * 1.5,
    paddingHorizontal: SIZES.paddingLarge,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.margin,
  },
  sectionTitle: {
    fontSize: SIZES.h4,
    fontWeight: 'bold',
    color: COLORS.textDark,
  },
  taskCard: {
    marginBottom: SIZES.margin,
  },
  taskHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SIZES.marginSmall,
    marginBottom: SIZES.margin,
  },
  taskTypeIcon: {
    width: 32,
    height: 32,
    borderRadius: SIZES.radiusSmall,
    backgroundColor: COLORS.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  taskDescription: {
    flex: 1,
    fontSize: SIZES.body,
    fontWeight: '600',
    color: COLORS.textDark,
  },
  payoutBadge: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SIZES.paddingSmall,
    paddingVertical: 6,
    borderRadius: SIZES.radiusSmall,
  },
  payoutText: {
    fontSize: SIZES.small,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  locationContainer: {
    marginBottom: SIZES.margin,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SIZES.marginSmall,
  },
  locationText: {
    flex: 1,
    fontSize: SIZES.small,
    color: COLORS.textDark,
  },
  dashedLine: {
    width: 1,
    height: 16,
    marginLeft: 4,
    marginVertical: 2,
    borderLeftWidth: 1,
    borderLeftColor: COLORS.border,
    borderStyle: 'dashed',
  },
  taskFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SIZES.margin,
  },
  distanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  distanceText: {
    fontSize: SIZES.tiny,
    color: COLORS.textGray,
  },
  stopsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  stopsText: {
    fontSize: SIZES.tiny,
    color: COLORS.textGray,
  },
  viewDetailsButton: {
    marginLeft: 'auto',
  },
  viewDetailsText: {
    fontSize: SIZES.small,
    fontWeight: '600',
    color: COLORS.primary,
  },
  emptyCard: {
    alignItems: 'center',
    paddingVertical: SIZES.paddingLarge * 2,
  },
  emptyText: {
    fontSize: SIZES.body,
    fontWeight: '600',
    color: COLORS.textDark,
    marginTop: SIZES.margin,
  },
  emptySubtext: {
    fontSize: SIZES.small,
    color: COLORS.textGray,
    marginTop: 4,
  },
  offlineCard: {
    alignItems: 'center',
    marginHorizontal: SIZES.paddingLarge,
    marginTop: SIZES.marginLarge * 2,
    paddingVertical: SIZES.paddingLarge * 2,
  },
  offlineTitle: {
    fontSize: SIZES.h3,
    fontWeight: 'bold',
    color: COLORS.textDark,
    marginTop: SIZES.margin,
  },
  offlineSubtitle: {
    fontSize: SIZES.body,
    color: COLORS.textGray,
    textAlign: 'center',
    marginTop: SIZES.marginSmall,
    paddingHorizontal: SIZES.paddingLarge,
  },
});

export default CourierDashboardScreen;
