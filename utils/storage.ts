import AsyncStorage from '@react-native-async-storage/async-storage';

// Save images to AsyncStorage
export const saveImage = async (category: string, uri: string) => {
  const savedImages = await AsyncStorage.getItem(category);
  const updatedImages = savedImages ? JSON.parse(savedImages) : [];
  updatedImages.push(uri);
  await AsyncStorage.setItem(category, JSON.stringify(updatedImages));
};

// Load images from AsyncStorage
export const loadImages = async (category: string) => {
  const savedImages = await AsyncStorage.getItem(category);
  return savedImages ? JSON.parse(savedImages) : [];
};

// Delete an image from AsyncStorage
export const deleteImage = async (category: string, uri: string) => {
  const savedImages = await AsyncStorage.getItem(category);
  if (savedImages) {
    const updatedImages = JSON.parse(savedImages).filter((image: string) => image !== uri);
    await AsyncStorage.setItem(category, JSON.stringify(updatedImages));
    return updatedImages;
  }
  return [];
};