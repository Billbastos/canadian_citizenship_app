import React from 'react';
import { Text, StyleSheet, View, FlatList, Dimensions } from 'react-native';
import Icon from '../../components/Icon';

const Result = ({ data }) => {
  const corrects = data.filter((c) => c.isCorrect).length;
  const total = Math.round((corrects * 100) / data.length);
  const passed = total >= 75;
  const passedColor = passed ? '#52BD94' : 'tomato';

  const renderItem = ({ item, index }) => {
    const color = item.isCorrect ? '#52BD94' : 'tomato';
    const bg = index % 2 ? 'rgba(200, 160, 242, .1)' : 'transparent';
    return (
      <View style={[styles.row, { backgroundColor: bg, borderRadius: 5, alignItems: 'center' }]}>
        <Text style={{ color: '#fff', fontSize: 12, minWidth: 30, paddingLeft: 10, }}>{index + 1}: </Text>
        <Text style={{ flex: 2, fontWeight: '200', color: '#fff', paddingLeft: 5, fontSize: 12 }}>
          {item.question}
        </Text>
        <Icon
          name={item.isCorrect ? 'check' : 'times'}
          color={color}
          size={16}
          overrides={{ padding: 10 }}
        />
      </View>
    );
  };

  return (
    <View style={styles.main}>
      <Text style={{ paddingTop: 10 }}></Text>
      {passed && (
        <Text
          style={[
            styles.textHeader,
            {
              color: '#ffffff',
              paddingBottom: 5,
            },
          ]}
        >
          Congratulations
        </Text>
      )}
      <Text style={[styles.textHeader, { color: passedColor }]}>
        You scored {total}%
      </Text>
      {!passed && (
        <Text
          style={[
            styles.textHeader,
            {
              color: '#ffffff',
              paddingTop: 5,
            },
          ]}
        >
          Try again
        </Text>
      )}
      <Text style={{ paddingBottom: 10 }}></Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={() => String(Math.random())}
        fadingEdgeLength={35}
        initialNumToRender={12}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingVertical: 7,
  },
  textHeader: {
    fontSize: 20,
    fontWeight: '500',
    paddingHorizontal: 5,
    textAlign: 'center',
    color: '#fff',
  },
});

export default Result;
