import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { COLORS, SIZES, SHADOWS } from '../../constants/theme';
import Card from '../../components/Card';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useApp } from '../../context/AppContext';

const CreateTaskScreen = ({ navigation, route }) => {
  const { createTask } = useApp();
  const initialTaskType = route?.params?.taskType;

  const [step, setStep] = useState(initialTaskType ? 2 : 1);
  const [taskType, setTaskType] = useState(initialTaskType || '');
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [pickupContact, setPickupContact] = useState('');
  const [dropoffContact, setDropoffContact] = useState('');
  const [stops, setStops] = useState([]);
  const [description, setDescription] = useState('');
  const [itemPhoto, setItemPhoto] = useState(null);
  const [timePreference, setTimePreference] = useState('now');
  const [scheduledDate, setScheduledDate] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash');

  const taskTypes = [
    {
      id: 'send',
      title: 'Send an Item',
      description: 'Parcel, documents, gadgets, etc.',
      icon: 'cube-outline',
      color: COLORS.primary,
    },
    {
      id: 'errand',
      title: 'Run an Errand',
      description: 'Buy items, pick up something',
      icon: 'cart-outline',
      color: '#f59e0b',
    },
    {
      id: 'multistop',
      title: 'Multi-stop Route',
      description: 'Pick up, buy, then deliver',
      icon: 'navigate-outline',
      color: '#8b5cf6',
    },
  ];

  const paymentMethods = [
    { id: 'cash', label: 'Cash on Delivery', icon: 'cash-outline' },
    { id: 'gcash', label: 'GCash', icon: 'wallet-outline' },
    { id: 'card', label: 'Credit/Debit Card', icon: 'card-outline' },
  ];

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      setItemPhoto(result.assets[0].uri);
    }
  };

  const addStop = () => {
    setStops([...stops, { address: '', type: 'pickup', note: '' }]);
  };

  const removeStop = (index) => {
    setStops(stops.filter((_, i) => i !== index));
  };

  const handleNext = () => {
    if (step < 5) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      navigation.goBack();
    }
  };

  const handleSubmit = () => {
    const baseFare = 50;
    const distanceFee = 30;
    const stopFees = stops.length * 20;
    const totalPrice = baseFare + distanceFee + stopFees;

    const newTask = createTask({
      type: taskType,
      pickup,
      dropoff,
      pickupContact,
      dropoffContact,
      stops,
      description,
      itemPhoto,
      timePreference,
      scheduledDate,
      paymentMethod,
      price: totalPrice,
      eta: '15 min',
    });

    navigation.navigate('LiveTracking', { taskId: newTask.id });
  };

  const renderProgressBar = () => (
    <View style={styles.progressContainer}>
      {[1, 2, 3, 4, 5].map((s) => (
        <View
          key={s}
          style={[
            styles.progressStep,
            s <= step && styles.progressStepActive,
          ]}
        />
      ))}
    </View>
  );

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Choose Task Type</Text>
            <Text style={styles.stepSubtitle}>What do you need help with?</Text>

            <View style={styles.taskTypesContainer}>
              {taskTypes.map((type) => (
                <Card
                  key={type.id}
                  style={[
                    styles.taskTypeCard,
                    taskType === type.id && styles.taskTypeCardActive,
                  ]}
                  onPress={() => setTaskType(type.id)}
                >
                  <View
                    style={[
                      styles.taskTypeIcon,
                      { backgroundColor: `${type.color}20` },
                    ]}
                  >
                    <Ionicons name={type.icon} size={32} color={type.color} />
                  </View>
                  <Text style={styles.taskTypeTitle}>{type.title}</Text>
                  <Text style={styles.taskTypeDescription}>{type.description}</Text>
                </Card>
              ))}
            </View>
          </View>
        );

      case 2:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Pickup & Drop-off</Text>
            <Text style={styles.stepSubtitle}>Where should we go?</Text>

            <Input
              label="Pickup Location"
              value={pickup}
              onChangeText={setPickup}
              placeholder="Enter pickup address"
              icon="location-outline"
            />

            <Input
              label="Pickup Contact"
              value={pickupContact}
              onChangeText={setPickupContact}
              placeholder="Contact name and phone"
              icon="person-outline"
            />

            <Input
              label="Drop-off Location"
              value={dropoff}
              onChangeText={setDropoff}
              placeholder="Enter drop-off address"
              icon="location-outline"
            />

            <Input
              label="Drop-off Contact"
              value={dropoffContact}
              onChangeText={setDropoffContact}
              placeholder="Contact name and phone"
              icon="person-outline"
            />

            {taskType === 'multistop' && (
              <>
                {stops.map((stop, index) => (
                  <Card key={index} style={styles.stopCard}>
                    <View style={styles.stopHeader}>
                      <Text style={styles.stopTitle}>Stop {index + 1}</Text>
                      <TouchableOpacity onPress={() => removeStop(index)}>
                        <Ionicons name="close-circle" size={24} color={COLORS.error} />
                      </TouchableOpacity>
                    </View>
                    <Input
                      placeholder="Address"
                      value={stop.address}
                      onChangeText={(text) => {
                        const newStops = [...stops];
                        newStops[index].address = text;
                        setStops(newStops);
                      }}
                    />
                    <Input
                      placeholder="Note (optional)"
                      value={stop.note}
                      onChangeText={(text) => {
                        const newStops = [...stops];
                        newStops[index].note = text;
                        setStops(newStops);
                      }}
                    />
                  </Card>
                ))}

                <Button
                  title="Add Stop"
                  onPress={addStop}
                  variant="outline"
                  icon={<Ionicons name="add" size={20} color={COLORS.textDark} />}
                />
              </>
            )}
          </View>
        );

      case 3:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Task Details</Text>
            <Text style={styles.stepSubtitle}>Tell us more about the task</Text>

            <Input
              label="Description"
              value={description}
              onChangeText={setDescription}
              placeholder="What needs to be done?"
              multiline
              numberOfLines={4}
            />

            <Text style={styles.label}>Item Photo (Optional)</Text>
            <TouchableOpacity style={styles.photoUpload} onPress={pickImage}>
              {itemPhoto ? (
                <Image source={{ uri: itemPhoto }} style={styles.uploadedPhoto} />
              ) : (
                <View style={styles.photoPlaceholder}>
                  <Ionicons name="camera-outline" size={32} color={COLORS.textGray} />
                  <Text style={styles.photoText}>Add Photo</Text>
                </View>
              )}
            </TouchableOpacity>

            <Text style={styles.label}>When do you need this?</Text>
            <View style={styles.timePreferenceContainer}>
              <TouchableOpacity
                style={[
                  styles.timeButton,
                  timePreference === 'now' && styles.timeButtonActive,
                ]}
                onPress={() => setTimePreference('now')}
              >
                <Ionicons
                  name="flash-outline"
                  size={20}
                  color={timePreference === 'now' ? COLORS.white : COLORS.textGray}
                />
                <Text
                  style={[
                    styles.timeButtonText,
                    timePreference === 'now' && styles.timeButtonTextActive,
                  ]}
                >
                  Now
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.timeButton,
                  timePreference === 'schedule' && styles.timeButtonActive,
                ]}
                onPress={() => setTimePreference('schedule')}
              >
                <Ionicons
                  name="calendar-outline"
                  size={20}
                  color={timePreference === 'schedule' ? COLORS.white : COLORS.textGray}
                />
                <Text
                  style={[
                    styles.timeButtonText,
                    timePreference === 'schedule' && styles.timeButtonTextActive,
                  ]}
                >
                  Schedule
                </Text>
              </TouchableOpacity>
            </View>

            {timePreference === 'schedule' && (
              <Input
                label="Date & Time"
                value={scheduledDate}
                onChangeText={setScheduledDate}
                placeholder="Select date and time"
                icon="time-outline"
              />
            )}
          </View>
        );

      case 4:
        const baseFare = 50;
        const distanceFee = 30;
        const stopFees = stops.length * 20;
        const total = baseFare + distanceFee + stopFees;

        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Price & Payment</Text>
            <Text style={styles.stepSubtitle}>Review your order</Text>

            <Card style={styles.priceCard}>
              <View style={styles.priceRow}>
                <Text style={styles.priceLabel}>Base Fare</Text>
                <Text style={styles.priceValue}>₱{baseFare}</Text>
              </View>
              <View style={styles.priceRow}>
                <Text style={styles.priceLabel}>Distance Fee</Text>
                <Text style={styles.priceValue}>₱{distanceFee}</Text>
              </View>
              {stops.length > 0 && (
                <View style={styles.priceRow}>
                  <Text style={styles.priceLabel}>
                    Additional Stops ({stops.length})
                  </Text>
                  <Text style={styles.priceValue}>₱{stopFees}</Text>
                </View>
              )}
              <View style={styles.priceDivider} />
              <View style={styles.priceRow}>
                <Text style={styles.priceTotalLabel}>Total</Text>
                <Text style={styles.priceTotalValue}>₱{total}</Text>
              </View>
            </Card>

            <Text style={styles.label}>Payment Method</Text>
            {paymentMethods.map((method) => (
              <Card
                key={method.id}
                style={[
                  styles.paymentCard,
                  paymentMethod === method.id && styles.paymentCardActive,
                ]}
                onPress={() => setPaymentMethod(method.id)}
              >
                <Ionicons
                  name={method.icon}
                  size={24}
                  color={paymentMethod === method.id ? COLORS.primary : COLORS.textGray}
                />
                <Text
                  style={[
                    styles.paymentLabel,
                    paymentMethod === method.id && styles.paymentLabelActive,
                  ]}
                >
                  {method.label}
                </Text>
                {paymentMethod === method.id && (
                  <Ionicons name="checkmark-circle" size={24} color={COLORS.primary} />
                )}
              </Card>
            ))}

            <View style={styles.infoBox}>
              <Ionicons name="information-circle-outline" size={20} color={COLORS.primary} />
              <Text style={styles.infoText}>
                Price is estimated and may adjust slightly based on actual distance
              </Text>
            </View>
          </View>
        );

      case 5:
        return (
          <View style={styles.stepContainer}>
            <View style={styles.successContainer}>
              <View style={styles.successIcon}>
                <Ionicons name="checkmark-circle" size={80} color={COLORS.success} />
              </View>
              <Text style={styles.successTitle}>Order Confirmed!</Text>
              <Text style={styles.successSubtitle}>
                Looking for a courier near you...
              </Text>

              <Card style={styles.summaryCard}>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>From</Text>
                  <Text style={styles.summaryValue}>{pickup}</Text>
                </View>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>To</Text>
                  <Text style={styles.summaryValue}>{dropoff}</Text>
                </View>
                {stops.length > 0 && (
                  <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Stops</Text>
                    <Text style={styles.summaryValue}>{stops.length} additional</Text>
                  </View>
                )}
              </Card>
            </View>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.textDark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create New Task</Text>
        <View style={{ width: 24 }} />
      </View>

      {renderProgressBar()}

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {renderStepContent()}
      </ScrollView>

      <View style={styles.footer}>
        {step < 5 && (
          <Button
            title={step === 4 ? 'Confirm and Request Courier' : 'Next'}
            onPress={step === 4 ? handleSubmit : handleNext}
            disabled={
              (step === 1 && !taskType) ||
              (step === 2 && (!pickup || !dropoff)) ||
              (step === 3 && !description)
            }
          />
        )}
        {step === 5 && (
          <Button
            title="View Live Tracking"
            onPress={() => navigation.replace('LiveTracking', { taskId: 'new' })}
          />
        )}
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SIZES.paddingLarge,
    paddingTop: 60,
    paddingBottom: SIZES.padding,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: SIZES.h4,
    fontWeight: 'bold',
    color: COLORS.textDark,
  },
  progressContainer: {
    flexDirection: 'row',
    paddingHorizontal: SIZES.paddingLarge,
    paddingVertical: SIZES.padding,
    gap: SIZES.marginSmall,
  },
  progressStep: {
    flex: 1,
    height: 4,
    backgroundColor: COLORS.border,
    borderRadius: 2,
  },
  progressStepActive: {
    backgroundColor: COLORS.primary,
  },
  content: {
    flex: 1,
    paddingHorizontal: SIZES.paddingLarge,
  },
  stepContainer: {
    paddingVertical: SIZES.paddingLarge,
  },
  stepTitle: {
    fontSize: SIZES.h2,
    fontWeight: 'bold',
    color: COLORS.textDark,
    marginBottom: SIZES.marginSmall,
  },
  stepSubtitle: {
    fontSize: SIZES.body,
    color: COLORS.textGray,
    marginBottom: SIZES.marginLarge,
  },
  taskTypesContainer: {
    gap: SIZES.margin,
  },
  taskTypeCard: {
    alignItems: 'center',
    paddingVertical: SIZES.paddingLarge,
    borderWidth: 2,
    borderColor: COLORS.border,
  },
  taskTypeCardActive: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.secondary,
  },
  taskTypeIcon: {
    width: 80,
    height: 80,
    borderRadius: SIZES.radiusLarge,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SIZES.margin,
  },
  taskTypeTitle: {
    fontSize: SIZES.h4,
    fontWeight: 'bold',
    color: COLORS.textDark,
    marginBottom: 4,
  },
  taskTypeDescription: {
    fontSize: SIZES.small,
    color: COLORS.textGray,
    textAlign: 'center',
  },
  stopCard: {
    marginBottom: SIZES.margin,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  stopHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.marginSmall,
  },
  stopTitle: {
    fontSize: SIZES.body,
    fontWeight: '600',
    color: COLORS.textDark,
  },
  label: {
    fontSize: SIZES.small,
    fontWeight: '600',
    color: COLORS.textDark,
    marginBottom: SIZES.marginSmall,
  },
  photoUpload: {
    marginBottom: SIZES.marginLarge,
  },
  photoPlaceholder: {
    height: 200,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.backgroundGray,
    borderWidth: 2,
    borderColor: COLORS.border,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadedPhoto: {
    height: 200,
    borderRadius: SIZES.radius,
    resizeMode: 'cover',
  },
  photoText: {
    fontSize: SIZES.small,
    color: COLORS.textGray,
    marginTop: SIZES.marginSmall,
  },
  timePreferenceContainer: {
    flexDirection: 'row',
    gap: SIZES.margin,
    marginBottom: SIZES.marginLarge,
  },
  timeButton: {
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
  timeButtonActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  timeButtonText: {
    fontSize: SIZES.body,
    fontWeight: '600',
    color: COLORS.textGray,
  },
  timeButtonTextActive: {
    color: COLORS.white,
  },
  priceCard: {
    marginBottom: SIZES.marginLarge,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SIZES.marginSmall,
  },
  priceLabel: {
    fontSize: SIZES.small,
    color: COLORS.textGray,
  },
  priceValue: {
    fontSize: SIZES.small,
    fontWeight: '600',
    color: COLORS.textDark,
  },
  priceDivider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: SIZES.margin,
  },
  priceTotalLabel: {
    fontSize: SIZES.h4,
    fontWeight: 'bold',
    color: COLORS.textDark,
  },
  priceTotalValue: {
    fontSize: SIZES.h3,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  paymentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SIZES.margin,
    marginBottom: SIZES.margin,
    paddingVertical: SIZES.padding,
    borderWidth: 2,
    borderColor: COLORS.border,
  },
  paymentCardActive: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.secondary,
  },
  paymentLabel: {
    flex: 1,
    fontSize: SIZES.body,
    fontWeight: '600',
    color: COLORS.textDark,
  },
  paymentLabelActive: {
    color: COLORS.primary,
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: COLORS.secondary,
    padding: SIZES.padding,
    borderRadius: SIZES.radiusSmall,
    gap: SIZES.marginSmall,
    marginTop: SIZES.margin,
  },
  infoText: {
    flex: 1,
    fontSize: SIZES.tiny,
    color: COLORS.primary,
  },
  successContainer: {
    alignItems: 'center',
    paddingVertical: SIZES.paddingLarge * 2,
  },
  successIcon: {
    marginBottom: SIZES.marginLarge,
  },
  successTitle: {
    fontSize: SIZES.h2,
    fontWeight: 'bold',
    color: COLORS.textDark,
    marginBottom: SIZES.marginSmall,
  },
  successSubtitle: {
    fontSize: SIZES.body,
    color: COLORS.textGray,
    textAlign: 'center',
    marginBottom: SIZES.marginLarge * 2,
  },
  summaryCard: {
    width: '100%',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SIZES.marginSmall,
  },
  summaryLabel: {
    fontSize: SIZES.small,
    fontWeight: '600',
    color: COLORS.textGray,
  },
  summaryValue: {
    flex: 1,
    fontSize: SIZES.small,
    color: COLORS.textDark,
    textAlign: 'right',
  },
  footer: {
    paddingHorizontal: SIZES.paddingLarge,
    paddingVertical: SIZES.padding,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
});

export default CreateTaskScreen;
