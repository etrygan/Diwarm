import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

type AddButtonProps = {
  onPress: () => void;
};

const AddButton = ({ onPress }: AddButtonProps) => {
  return (
    <TouchableOpacity style={styles.addButton} onPress={onPress}>
      <Text style={styles.addButtonText}>+</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  addButton: {
    width: 224, // 160 (original width) * 1.4 = 224
    height: 160, // Keep the height the same
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
  },
  addButtonText: {
    fontSize: 36,
    color: '#555',
  },
});

export default AddButton;