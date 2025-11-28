import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES, SHADOWS } from '../../constants/theme';
import Card from '../../components/Card';
import StatusBadge from '../../components/StatusBadge';
import { useApp } from '../../context/AppContext';

const UserDashboardScreen = ({ navigation }) => {
  const { user, tasks } = useApp();

  const ongoingTasks = tasks.filter(
    task => ['searching', 'accepted', 'pickup', 'in_transit'].includes(task.status)
  );

  const recentTasks = tasks.filter(
    task => ['completed', 'cancelled'].includes(task.status)
  ).slice(0, 5);

  const quickActions = [
    { id: 'send', icon: 'cube-outline', label: 'Send Item', color: COLORS.primary },
    { id: 'errand', icon: 'cart-outline', label: 'Run Errand', color: '#f59e0b' },
    { id: 'multistop', icon: 'navigate-outline', label: 'Multi-stop', color: '#8b5cf6' },
  ];

  const handleQuickAction = (actionId) => {
    navigation.navigate('CreateTask', { taskType: actionId });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.greeting}>Hi, {user?.name?.split(' ')[0] || 'User'}</Text>
          <View style={styles.locationContainer}>
            <Ionicons name="location-outline" size={14} color={COLORS.textGray} />
            <Text style={styles.location}>Manila, Philippines</Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('UserProfile')}>
          {user?.avatar ? (
            <Image source={{ uri: user.avatar }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Ionicons name="person" size={24} color={COLORS.white} />
            </View>
          )}
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity
          style={styles.searchBar}
          onPress={() => navigation.navigate('CreateTask')}
        >
          <Ionicons name="search-outline" size={20} color={COLORS.textGray} />
          <Text style={styles.searchText}>
            Where do you need to send or buy something?
          </Text>
        </TouchableOpacity>

        <View style={styles.quickActionsContainer}>
          {quickActions.map((action) => (
            <TouchableOpacity
              key={action.id}
              style={styles.quickAction}
              onPress={() => handleQuickAction(action.id)}
            >
              <View style={[styles.quickActionIcon, { backgroundColor: `${action.color}20` }]}>
                <Ionicons name={action.icon} size={24} color={action.color} />
              </View>
              <Text style={styles.quickActionLabel}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {ongoingTasks.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Ongoing Orders</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.horizontalScroll}
            >
              {ongoingTasks.map((task) => (
                <Card
                  key={task.id}
                  style={styles.ongoingCard}
                  onPress={() => navigation.navigate('LiveTracking', { taskId: task.id })}
                >
                  <View style={styles.ongoingCardHeader}>
                    <View style={styles.taskTypeContainer}>
                      <Ionicons
                        name={task.type === 'send' ? 'cube-outline' : 'cart-outline'}
                        size={16}
                        color={COLORS.primary}
                      />
                      <Text style={styles.taskType}>
                        {task.type === 'send' ? 'Send Item' : 'Run Errand'}
                      </Text>
                    </View>
                    <StatusBadge status={task.status} />
                  </View>

                  <View style={styles.locationRow}>
                    <Ionicons name="ellipse" size={8} color={COLORS.primary} />
                    <Text style={styles.locationText} numberOfLines={1}>
                      {task.pickup}
                    </Text>
                  </View>
                  <View style={styles.dashedLine} />
                  <View style={styles.locationRow}>
                    <Ionicons name="location" size={12} color={COLORS.error} />
                    <Text style={styles.locationText} numberOfLines={1}>
                      {task.dropoff}
                    </Text>
                  </View>

                  {task.courier && (
                    <View style={styles.courierInfo}>
                      <View style={styles.courierAvatar}>
                        <Ionicons name="person" size={16} color={COLORS.white} />
                      </View>
                      <Text style={styles.courierName}>{task.courier.name}</Text>
                    </View>
                  )}

                  <View style={styles.etaContainer}>
                    <Ionicons name="time-outline" size={16} color={COLORS.primary} />
                    <Text style={styles.eta}>ETA: {task.eta || '15 min'}</Text>
                  </View>
                </Card>
              ))}
            </ScrollView>
          </View>
        )}

        {recentTasks.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Recent Tasks</Text>
              <TouchableOpacity onPress={() => navigation.navigate('OrderHistory')}>
                <Text style={styles.seeAll}>See All</Text>
              </TouchableOpacity>
            </View>

            {recentTasks.map((task) => (
              <Card
                key={task.id}
                style={styles.recentCard}
                onPress={() => navigation.navigate('OrderHistory')}
              >
                <View style={styles.recentCardContent}>
                  <View style={styles.recentCardIcon}>
                    <Ionicons
                      name={task.type === 'send' ? 'cube-outline' : 'cart-outline'}
                      size={20}
                      color={COLORS.primary}
                    />
                  </View>

                  <View style={styles.recentCardInfo}>
                    <View style={styles.recentCardRow}>
                      <Text style={styles.recentCardTitle} numberOfLines={1}>
                        {task.pickup}
                      </Text>
                      <StatusBadge status={task.status} />
                    </View>
                    <View style={styles.recentCardRoute}>
                      <Ionicons name="arrow-forward" size={12} color={COLORS.textGray} />
                      <Text style={styles.recentCardDestination} numberOfLines={1}>
                        {task.dropoff}
                      </Text>
                    </View>
                    <Text style={styles.recentCardDate}>{task.createdAt}</Text>
                  </View>

                  <View style={styles.recentCardPrice}>
                    <Text style={styles.price}>₱{task.price}</Text>
                  </View>
                </View>
              </Card>
            ))}
          </View>
        )}

        <View style={{ height: 100 }} />
      </ScrollView>

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('CreateTask')}
      >
        <Ionicons name="add" size={28} color={COLORS.white} />
      </TouchableOpacity>
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
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  location: {
    fontSize: SIZES.tiny,
    color: COLORS.textGray,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  avatarPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    flex: 1,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    marginHorizontal: SIZES.paddingLarge,
    marginTop: SIZES.marginLarge,
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.paddingSmall,
    borderRadius: SIZES.radius,
    gap: SIZES.marginSmall,
    ...SHADOWS.small,
  },
  searchText: {
    flex: 1,
    fontSize: SIZES.small,
    color: COLORS.textGray,
  },
  quickActionsContainer: {
    flexDirection: 'row',
    paddingHorizontal: SIZES.paddingLarge,
    marginTop: SIZES.marginLarge,
    gap: SIZES.margin,
  },
  quickAction: {
    flex: 1,
    alignItems: 'center',
    gap: SIZES.marginSmall,
  },
  quickActionIcon: {
    width: 60,
    height: 60,
    borderRadius: SIZES.radius,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickActionLabel: {
    fontSize: SIZES.tiny,
    color: COLORS.textDark,
    fontWeight: '600',
    textAlign: 'center',
  },
  section: {
    marginTop: SIZES.marginLarge * 1.5,
    paddingLeft: SIZES.paddingLarge,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: SIZES.paddingLarge,
    marginBottom: SIZES.margin,
  },
  sectionTitle: {
    fontSize: SIZES.h4,
    fontWeight: 'bold',
    color: COLORS.textDark,
    marginBottom: SIZES.margin,
  },
  seeAll: {
    fontSize: SIZES.small,
    color: COLORS.primary,
    fontWeight: '600',
  },
  horizontalScroll: {
    paddingRight: SIZES.paddingLarge,
  },
  ongoingCard: {
    width: 280,
    marginRight: SIZES.margin,
  },
  ongoingCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.margin,
  },
  taskTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  taskType: {
    fontSize: SIZES.small,
    fontWeight: '600',
    color: COLORS.textDark,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SIZES.marginSmall,
    marginVertical: 4,
  },
  locationText: {
    flex: 1,
    fontSize: SIZES.small,
    color: COLORS.textDark,
  },
  dashedLine: {
    width: 1,
    height: 20,
    marginLeft: 4,
    borderLeftWidth: 1,
    borderLeftColor: COLORS.border,
    borderStyle: 'dashed',
  },
  courierInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SIZES.marginSmall,
    marginTop: SIZES.margin,
    paddingTop: SIZES.margin,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  courierAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  courierName: {
    fontSize: SIZES.tiny,
    color: COLORS.textGray,
  },
  etaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: SIZES.marginSmall,
  },
  eta: {
    fontSize: SIZES.small,
    fontWeight: '600',
    color: COLORS.primary,
  },
  recentCard: {
    marginHorizontal: SIZES.paddingLarge,
    marginBottom: SIZES.margin,
  },
  recentCardContent: {
    flexDirection: 'row',
    gap: SIZES.margin,
  },
  recentCardIcon: {
    width: 40,
    height: 40,
    borderRadius: SIZES.radiusSmall,
    backgroundColor: COLORS.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  recentCardInfo: {
    flex: 1,
    gap: 4,
  },
  recentCardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: SIZES.marginSmall,
  },
  recentCardTitle: {
    flex: 1,
    fontSize: SIZES.small,
    fontWeight: '600',
    color: COLORS.textDark,
  },
  recentCardRoute: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  recentCardDestination: {
    flex: 1,
    fontSize: SIZES.tiny,
    color: COLORS.textGray,
  },
  recentCardDate: {
    fontSize: SIZES.tiny,
    color: COLORS.textLight,
  },
  recentCardPrice: {
    justifyContent: 'center',
  },
  price: {
    fontSize: SIZES.body,
    fontWeight: 'bold',
    color: COLORS.textDark,
  },
  fab: {
    position: 'absolute',
    bottom: 80,
    right: SIZES.paddingLarge,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.large,
  },
});

export default UserDashboardScreen;
