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
import { COLORS, SIZES } from '../../constants/theme';
import Card from '../../components/Card';
import Input from '../../components/Input';
import Button from '../../components/Button';

const TaskCompletionScreen = ({ navigation, route }) => {
  const [photo, setPhoto] = useState(null);
  const [recipientName, setRecipientName] = useState('');
  const [notes, setNotes] = useState('');

  const task = {
    id: '1',
    payout: 150,
  };

  const takePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  const handleComplete = () => {
    navigation.navigate('CompletionSuccess', {
      taskId: task.id,
      payout: task.payout,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.textDark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Complete Delivery</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Card style={styles.card}>
          <Text style={styles.cardTitle}>Proof of Delivery</Text>
          <Text style={styles.cardSubtitle}>
            Take a photo as proof of successful delivery
          </Text>

          <TouchableOpacity style={styles.photoContainer} onPress={takePhoto}>
            {photo ? (
              <Image source={{ uri: photo }} style={styles.photo} />
            ) : (
              <View style={styles.photoPlaceholder}>
                <Ionicons name="camera-outline" size={48} color={COLORS.textGray} />
                <Text style={styles.photoText}>Take Photo</Text>
              </View>
            )}
          </TouchableOpacity>
        </Card>

        <Card style={styles.card}>
          <Text style={styles.cardTitle}>Recipient Information</Text>

          <Input
            label="Recipient Name"
            value={recipientName}
            onChangeText={setRecipientName}
            placeholder="Enter recipient name"
            icon="person-outline"
          />

          <Input
            label="Delivery Notes (Optional)"
            value={notes}
            onChangeText={setNotes}
            placeholder="Any additional notes"
            multiline
            numberOfLines={3}
            icon="document-text-outline"
          />
        </Card>

        <Card style={styles.earningsCard}>
          <View style={styles.earningsIcon}>
            <Ionicons name="checkmark-circle" size={48} color={COLORS.success} />
          </View>
          <Text style={styles.earningsLabel}>You'll Earn</Text>
          <Text style={styles.earningsValue}>₱{task.payout}</Text>
        </Card>

        <View style={{ height: 100 }} />
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title="Complete Task"
          onPress={handleComplete}
          disabled={!photo || !recipientName}
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
  card: {
    marginHorizontal: SIZES.paddingLarge,
    marginTop: SIZES.marginLarge,
  },
  cardTitle: {
    fontSize: SIZES.h4,
    fontWeight: 'bold',
    color: COLORS.textDark,
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: SIZES.small,
    color: COLORS.textGray,
    marginBottom: SIZES.marginLarge,
  },
  photoContainer: {
    marginBottom: SIZES.margin,
  },
  photo: {
    width: '100%',
    height: 200,
    borderRadius: SIZES.radius,
    resizeMode: 'cover',
  },
  photoPlaceholder: {
    width: '100%',
    height: 200,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.backgroundGray,
    borderWidth: 2,
    borderColor: COLORS.border,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoText: {
    fontSize: SIZES.body,
    color: COLORS.textGray,
    marginTop: SIZES.marginSmall,
  },
  earningsCard: {
    marginHorizontal: SIZES.paddingLarge,
    marginTop: SIZES.marginLarge,
    alignItems: 'center',
    paddingVertical: SIZES.paddingLarge,
    backgroundColor: COLORS.secondary,
  },
  earningsIcon: {
    marginBottom: SIZES.margin,
  },
  earningsLabel: {
    fontSize: SIZES.small,
    color: COLORS.textGray,
    marginBottom: 4,
  },
  earningsValue: {
    fontSize: SIZES.h1,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  footer: {
    paddingHorizontal: SIZES.paddingLarge,
    paddingVertical: SIZES.padding,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
});

export default TaskCompletionScreen;
