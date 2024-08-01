import React from 'react';
import { View, StyleSheet } from 'react-native';

const Footer = ({ children, overrides }) => {
  return <View style={[styles.footer, { ...overrides }]}>{children}</View>;
};

const styles = StyleSheet.create({
  footer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
});

export default Footer;
