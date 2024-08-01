import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Badge = ({ label, fontColor, color, shadowColor }) => {
  const _fontColor = fontColor || '#333';
  return (
    <View
      style={[
        styles.badgeView,
        { backgroundColor: shadowColor, outlineOffset: 2 },
      ]}
    >
      <View
        style={[
          styles.badgeText,
          { backgroundColor: color, transform: [{ translateY: -4 }] },
        ]}
      >
        <Text style={[styles.label, { color: _fontColor }]}>{label}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  badgeView: {
    padding: 0,
    margin: 3,
    borderRadius: 8,
  },
  badgeText: {
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  label: {
    textAlign: 'center',
    borderRadius: 8,
  },
});

export default Badge;
