import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { loadImages, saveImage, deleteImage } from '../utils/storage';
import ImageGrid from '../components/ImageGrid';

const WardrobeScreen = () => {
  const [tops, setTops] = useState<string[]>([]);
  const [bottoms, setBottoms] = useState<string[]>([]);
  const [shoes, setShoes] = useState<string[]>([]);

  // Load saved images from AsyncStorage on component mount
  useEffect(() => {
    const loadAllImages = async () => {
      setTops(await loadImages('tops'));
      setBottoms(await loadImages('bottoms'));
      setShoes(await loadImages('shoes'));
    };
    loadAllImages();
  }, []);

  // Handle long press for individual deletion
  const handleLongPress = (uri: string, category: string) => {
    Alert.alert(
      'Delete Item',
      'Are you sure you want to delete this item?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          onPress: () => deleteItem(uri, category),
        },
      ]
    );
  };

  // Delete an individual item
  const deleteItem = async (uri: string, category: string) => {
    const updatedImages = await deleteImage(category, uri);
    if (category === 'tops') setTops(updatedImages);
    if (category === 'bottoms') setBottoms(updatedImages);
    if (category === 'shoes') setShoes(updatedImages);
  };

  // Handle adding new images
  const pickImage = async (category: string) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      await saveImage(category, result.assets[0].uri);
      if (category === 'tops') setTops(await loadImages('tops'));
      if (category === 'bottoms') setBottoms(await loadImages('bottoms'));
      if (category === 'shoes') setShoes(await loadImages('shoes'));
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Text style={styles.title}>Digital Wardrobe Manager</Text>

      {/* Tops Section */}
      <Text style={styles.sectionTitle}>Tops</Text>
      <ImageGrid
        images={tops}
        onAddPress={() => pickImage('tops')}
        onLongPress={(uri) => handleLongPress(uri, 'tops')}
      />

      {/* Bottoms Section */}
      <Text style={styles.sectionTitle}>Bottoms</Text>
      <ImageGrid
        images={bottoms}
        onAddPress={() => pickImage('bottoms')}
        onLongPress={(uri) => handleLongPress(uri, 'bottoms')}
      />

      {/* Shoes Section */}
      <Text style={styles.sectionTitle}>Shoes</Text>
      <ImageGrid
        images={shoes}
        onAddPress={() => pickImage('shoes')}
        onLongPress={(uri) => handleLongPress(uri, 'shoes')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: StatusBar.currentHeight + 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
});

export default WardrobeScreen;