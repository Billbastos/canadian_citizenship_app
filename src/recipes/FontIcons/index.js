import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from '../../components/Icon';

const Icons = ({ navigation }) => (
  <View style={styles.icons}>
    <TouchableOpacity onPress={() => navigation.navigate('Test')}>
      <Icon name="test" label="start test" />
    </TouchableOpacity>
    <Icon name="report" label="report" />
    <Icon name="settings" label="settings" />
  </View>
);

const styles = StyleSheet.create({
  icons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});

export default Icons;
