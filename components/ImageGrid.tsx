import React from 'react';
import { ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import AddButton from './AddButton';

type ImageGridProps = {
  images: string[];
  onAddPress: () => void;
  onLongPress: (uri: string) => void;
};

const ImageGrid = ({ images, onAddPress, onLongPress }: ImageGridProps) => {
  return (
    <ScrollView horizontal style={styles.scrollSection}>
      {images.map((uri, index) => (
        <TouchableOpacity
          key={index}
          onLongPress={() => onLongPress(uri)} // Handle long press
        >
          <Image source={{ uri }} style={styles.image} />
        </TouchableOpacity>
      ))}
      <AddButton onPress={onAddPress} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollSection: {
    marginBottom: 20,
  },
  image: {
    width: 160,
    height: 160,
    marginRight: 10,
    borderRadius: 10,
  },
});

export default ImageGrid;