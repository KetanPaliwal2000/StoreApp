import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CheckoutSuccess = ({ route, navigation }) => {
  const { orderId, total } = route.params;

  return (
    <View style={styles.container}>
      <Ionicons name="checkmark-circle" size={80} color="#2ecc71" />
      <Text style={styles.title}>Order Placed Successfully!</Text>
      <Text style={styles.orderId}>Order #: {orderId}</Text>
      <Text style={styles.total}>Total Paid: ${total}</Text>
      <Text style={styles.message}>
        Thank you for your purchase. Your order will be shipped soon.
      </Text>
      <Button 
        title="Back to Shopping" 
        onPress={() => navigation.popToTop()} 
        color="tomato"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 16,
  },
  orderId: {
    fontSize: 18,
    marginBottom: 8,
  },
  total: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 24,
  },
  message: {
    textAlign: 'center',
    marginBottom: 24,
    fontSize: 16,
    color: '#555',
  },
});

export default CheckoutSuccess;