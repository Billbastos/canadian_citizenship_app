import React from 'react';
import { StyleSheet, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCanadianMapleLeaf } from '@fortawesome/free-brands-svg-icons';

const Flag = () => {
  return (
    <View style={styles.flag}>
      <View style={styles.column}></View>
      <View style={styles.columnCenter}>
        <FontAwesomeIcon
          icon={faCanadianMapleLeaf}
          color={'tomato'}
          size={43}
        />
      </View>
      <View style={styles.column}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  flag: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  column: {
    height: 60,
    width: 28,
    backgroundColor: 'tomato',
  },
  columnCenter: {
    display: 'flex',
    justifyContent: 'center',
    height: 60,
    backgroundColor: 'white',
    paddingHorizontal: 7,
  },
});

export default Flag;
