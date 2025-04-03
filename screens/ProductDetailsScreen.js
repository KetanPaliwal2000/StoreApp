import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../context/CartContext';
import { db, auth } from '../firebase';
import { doc, setDoc, deleteDoc, getDoc } from 'firebase/firestore';

const ProductDetailsScreen = ({ route }) => {
  const { product } = route.params;
  const { addToCart } = useCart();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Check favorite status on load
  useEffect(() => {
    const checkFavoriteStatus = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const favoriteRef = doc(db, 'users', user.uid, 'favorites', product.id.toString());
      const docSnap = await getDoc(favoriteRef);
      setIsFavorite(docSnap.exists());
    };

    checkFavoriteStatus();
  }, [product.id]);

  const toggleFavorite = async () => {
    const user = auth.currentUser;
    if (!user) {
      Alert.alert('Login Required', 'Please login to manage favorites');
      return;
    }

    setIsProcessing(true);
    try {
      const favoriteRef = doc(db, 'users', user.uid, 'favorites', product.id.toString());

      if (isFavorite) {
        await deleteDoc(favoriteRef);
        setIsFavorite(false);
      } else {
        await setDoc(favoriteRef, {
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          description: product.description,
          rating: {
            'rate': product.rating?.rate,
            'count': product.rating?.count,
          },
          createdAt: new Date()
        });
        setIsFavorite(true);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      Alert.alert('Error', 'Failed to update favorites');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleAddToCart = async () => {
    try {
      const success = await addToCart(product);
      if (success) {
        Alert.alert('Added to Cart', `${product.title} has been added to your cart`);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to add item to cart');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.productImage} />
      
      <View style={styles.header}>
        <Text style={styles.title}>{product.title}</Text>
        <TouchableOpacity 
          onPress={toggleFavorite}
          disabled={isProcessing}
          style={styles.favoriteButton}
        >
          <Ionicons 
            name={isFavorite ? 'heart' : 'heart-outline'} 
            size={28} 
            color={isFavorite ? 'red' : '#000'} 
          />
        </TouchableOpacity>
      </View>

      <View style={styles.priceContainer}>
        <Text style={styles.price}>${product.price.toFixed(2)}</Text>
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={16} color="#f1c40f" />
          <Text style={styles.ratingText}>
            {product.rating?.rate || 0} ({product.rating?.count || 0} reviews)
          </Text>
        </View>
      </View>

      <Text style={styles.description}>{product.description}</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.cartButton]}
          onPress={handleAddToCart}
        >
          <Ionicons name="cart" size={20} color="white" />
          <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  productImage: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    flex: 1,
  },
  favoriteButton: {
    padding: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2ecc71',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 16,
    color: '#7f8c8d',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#2c3e50',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  actionButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 8,
    flex: 1,
  },
  cartButton: {
    backgroundColor: 'tomato',
    marginRight: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 10,
  },
});

export default ProductDetailsScreen;