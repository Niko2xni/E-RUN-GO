import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../../constants/theme';
import Card from '../../components/Card';
import Button from '../../components/Button';

const CourierEarningsScreen = ({ navigation }) => {
  const [period, setPeriod] = useState('today');

  const earnings = {
    today: 1250,
    week: 8750,
    month: 35200,
  };

  const periods = [
    { id: 'today', label: 'Today' },
    { id: 'week', label: 'This Week' },
    { id: 'month', label: 'This Month' },
  ];

  const transactions = [
    { id: '1', type: 'Task Completed', amount: 150, date: '2024-01-15 14:30', taskId: '#12345' },
    { id: '2', type: 'Task Completed', amount: 200, date: '2024-01-15 12:15', taskId: '#12344' },
    { id: '3', type: 'Task Completed', amount: 180, date: '2024-01-15 10:00', taskId: '#12343' },
    { id: '4', type: 'Payout', amount: -1000, date: '2024-01-14 09:00', taskId: 'Bank Transfer' },
    { id: '5', type: 'Task Completed', amount: 220, date: '2024-01-14 16:45', taskId: '#12342' },
  ];

  const renderTransaction = ({ item }) => (
    <Card style={styles.transactionCard}>
      <View style={styles.transactionIcon}>
        <Ionicons
          name={item.amount > 0 ? 'add-circle' : 'remove-circle'}
          size={24}
          color={item.amount > 0 ? COLORS.success : COLORS.error}
        />
      </View>
      <View style={styles.transactionInfo}>
        <Text style={styles.transactionType}>{item.type}</Text>
        <Text style={styles.transactionDate}>{item.date}</Text>
        <Text style={styles.transactionId}>{item.taskId}</Text>
      </View>
      <Text
        style={[
          styles.transactionAmount,
          item.amount < 0 && styles.transactionAmountNegative,
        ]}
      >
        {item.amount > 0 ? '+' : ''}₱{Math.abs(item.amount)}
      </Text>
    </Card>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.textDark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Earnings & Wallet</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Card style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Total Balance</Text>
          <Text style={styles.balanceValue}>₱{earnings[period].toFixed(2)}</Text>

          <View style={styles.periodSelector}>
            {periods.map((p) => (
              <TouchableOpacity
                key={p.id}
                style={[
                  styles.periodButton,
                  period === p.id && styles.periodButtonActive,
                ]}
                onPress={() => setPeriod(p.id)}
              >
                <Text
                  style={[
                    styles.periodText,
                    period === p.id && styles.periodTextActive,
                  ]}
                >
                  {p.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Button
            title="Request Payout"
            variant="primary"
            style={styles.payoutButton}
          />
        </Card>

        <View style={styles.statsRow}>
          <Card style={styles.statCard}>
            <Ionicons name="trending-up-outline" size={24} color={COLORS.primary} />
            <Text style={styles.statValue}>₱{(earnings[period] / 8).toFixed(0)}</Text>
            <Text style={styles.statLabel}>Avg per Task</Text>
          </Card>

          <Card style={styles.statCard}>
            <Ionicons name="checkmark-done-outline" size={24} color={COLORS.success} />
            <Text style={styles.statValue}>8</Text>
            <Text style={styles.statLabel}>Tasks Done</Text>
          </Card>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Transaction History</Text>

          <FlatList
            data={transactions}
            renderItem={renderTransaction}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
          />
        </View>

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
  balanceCard: {
    marginHorizontal: SIZES.paddingLarge,
    marginTop: SIZES.marginLarge,
    alignItems: 'center',
    paddingVertical: SIZES.paddingLarge * 1.5,
    backgroundColor: COLORS.primary,
  },
  balanceLabel: {
    fontSize: SIZES.body,
    color: COLORS.white,
    opacity: 0.9,
    marginBottom: SIZES.marginSmall,
  },
  balanceValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: SIZES.marginLarge,
  },
  periodSelector: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: SIZES.radius,
    padding: 4,
    marginBottom: SIZES.marginLarge,
  },
  periodButton: {
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.paddingSmall,
    borderRadius: SIZES.radiusSmall,
  },
  periodButtonActive: {
    backgroundColor: COLORS.white,
  },
  periodText: {
    fontSize: SIZES.small,
    fontWeight: '600',
    color: COLORS.white,
  },
  periodTextActive: {
    color: COLORS.primary,
  },
  payoutButton: {
    width: '100%',
    backgroundColor: COLORS.white,
  },
  statsRow: {
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
  statValue: {
    fontSize: SIZES.h3,
    fontWeight: 'bold',
    color: COLORS.textDark,
    marginTop: SIZES.marginSmall,
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
  sectionTitle: {
    fontSize: SIZES.h4,
    fontWeight: 'bold',
    color: COLORS.textDark,
    marginBottom: SIZES.margin,
  },
  transactionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SIZES.margin,
    marginBottom: SIZES.margin,
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: SIZES.radiusSmall,
    backgroundColor: COLORS.backgroundGray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  transactionInfo: {
    flex: 1,
  },
  transactionType: {
    fontSize: SIZES.body,
    fontWeight: '600',
    color: COLORS.textDark,
    marginBottom: 2,
  },
  transactionDate: {
    fontSize: SIZES.tiny,
    color: COLORS.textGray,
    marginBottom: 2,
  },
  transactionId: {
    fontSize: SIZES.tiny,
    color: COLORS.textLight,
  },
  transactionAmount: {
    fontSize: SIZES.h4,
    fontWeight: 'bold',
    color: COLORS.success,
  },
  transactionAmountNegative: {
    color: COLORS.error,
  },
});

export default CourierEarningsScreen;
