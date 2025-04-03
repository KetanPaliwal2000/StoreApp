import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert } from 'react-native';
import { useCart } from '../context/CartContext';
import { addReceipt } from '../firebase';
import { auth } from '../firebase';

const CheckoutScreen = ({ navigation }) => {
  const { cart, clearCart } = useCart();
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCheckout = async () => {
    if (!address) {
      Alert.alert('Error', 'Please enter your shipping address');
      return;
    }

    setIsProcessing(true);
    try {
      const user = auth.currentUser;
      const receiptData = {
        items: cart.items,
        total: cart.total,
        address,
        paymentMethod,
        status: 'processing'
      };

      await addReceipt(user.uid, receiptData);
      await clearCart();
      
      navigation.navigate('CheckoutSuccess', { 
        orderId: Date.now().toString(),
        total: cart.total 
      });
    } catch (error) {
      console.error('Checkout error:', error);
      Alert.alert('Error', 'Failed to complete checkout');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Checkout</Text>
      
      <Text style={styles.sectionTitle}>Shipping Information</Text>
      <TextInput
        style={styles.input}
        placeholder="Full Address"
        value={address}
        onChangeText={setAddress}
      />

      <Text style={styles.sectionTitle}>Payment Method</Text>
      <View style={styles.paymentOptions}>
        <Button 
          title="Credit Card" 
          onPress={() => setPaymentMethod('credit_card')} 
          color={paymentMethod === 'credit_card' ? 'tomato' : '#ccc'}
        />
        <Button 
          title="PayPal" 
          onPress={() => setPaymentMethod('paypal')} 
          color={paymentMethod === 'paypal' ? 'tomato' : '#ccc'}
        />
        <Button 
          title="Cash on Delivery" 
          onPress={() => setPaymentMethod('cod')} 
          color={paymentMethod === 'cod' ? 'tomato' : '#ccc'}
        />
      </View>

      <Text style={styles.total}>Total: ${cart.total}</Text>

      <Button 
        title={isProcessing ? "Processing..." : "Place Order"} 
        onPress={handleCheckout} 
        disabled={isProcessing}
        color="tomato"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    marginBottom: 16,
    borderRadius: 6,
  },
  paymentOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  total: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'right',
  },
});

export default CheckoutScreen;