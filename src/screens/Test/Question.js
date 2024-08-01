import React, { useState } from 'react';
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import Button from '../../components/Button';
import Icon from '../../components/Icon';
import { badgeColors } from '../../constants';
import Badge from '../../components/Badge';
import _ from 'lodash';

const Body = ({ item, update, getNextQuestion }) => {
  const [next, setNext] = useState(false);

  const _data =
    typeof item.randomize !== 'undefined' && item.randomize === false
      ? item
      : { ...item, alternatives: _.shuffle(item.alternatives) };

  const renderItem = ({ item }) => {
    const key = Object.keys(item)[0];
    const value = Object.values(item)[0];
    return (
      <Button
        title={value}
        action={() => {
          update(_data.id, key == _data.answer);
          setNext(true);
        }}
      />
    );
  };

  const handlePress = () => {
    getNextQuestion();
    setNext(false);
  };

  const response = _data.alternatives.filter(
    (m) => _data.answer == Object.keys(m)[0]
  )[0];
  const isCorrectColor = _data.isCorrect ? '#52BD94' : 'tomato';
  const isCorrectText = _data.isCorrect ? 'Correct' : 'Wrong';

  return !next ? (
    <FlatList
      data={_data.alternatives}
      renderItem={renderItem}
      keyExtractor={() => String(Math.random())}
      contentContainerStyle={{ justifyContent: 'flex-start' }}
      fadingEdgeLength={35}
    />
  ) : (
    <ScrollView fadingEdgeLength={35}>
      <View style={styles.body}>
        <Text
          style={[
            styles.bodyAnswer,
            {
              color: isCorrectColor,
              display: 'flex',
            },
          ]}
        >
          <Icon
            name={_data.isCorrect ? 'check' : 'times'}
            color={isCorrectColor}
            size={16}
            stroke={3}
            overrides={{
              padding: 0,
              paddingRight: 0,
              alignSelf: 'center',
            }}
          />
          <Text> {isCorrectText}</Text>
        </Text>
      </View>
      {!_data.isCorrect && (
        <Text style={styles.correct}>
          Correct answer:{' '}
          <Text style={styles.answer}>{Object.values(response)[0]}</Text>
        </Text>
      )}
      {Boolean(_data.description) && (
        <>
          <Text style={styles.description}>{_data.description}</Text>
          <Text style={styles.page}>Find more on page: {_data.page}</Text>
        </>
      )}
      <Button
        title="next"
        action={handlePress}
        overrides={{ fontSize: 16 }}
        icon={{ name: 'next', size: 16 }}
      />
    </ScrollView>
  );
};

const Question = ({ number, item, update, getNextQuestion }) => {
  return (
    <View style={[styles.main]}>
      <Text style={styles.question}>
        {number} - {item.question}
      </Text>
      <View style={styles.row}>
        {item.categories.map((c) => (
          <Badge
            key={c}
            label={c}
            color={badgeColors[c][0]}
            shadowColor={badgeColors[c][1]}
          />
        ))}
      </View>
      <View style={{ marginHorizontal: 10, paddingVertical: 15, flex: 1 }}>
        <SafeAreaView style={styles.container}>
          <Body item={item} update={update} getNextQuestion={getNextQuestion} />
        </SafeAreaView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    display: 'flex',
    flex: 1,
  },
  body: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 20,
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
  },
  bodyAnswer: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 15,
  },
  number: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    color: '#fff',
  },
  question: {
    fontWeight: '600',
    fontSize: 16,
    color: '#fff',
    paddingBottom: 8,
  },
  answer: {
    fontWeight: '500',
    fontSize: 14,
    color: '#52BD94',
  },
  correct: {
    marginBottom: 15,
    marginHorizontal: 10,
    color: '#fff',
  },
  description: {
    paddingBottom: 10,
    paddingHorizontal: 10,
    color: '#dcc3f7',
    fontStyle: 'italic',
  },
  page: {
    paddingBottom: 20,
    paddingHorizontal: 10,
    color: '#fff',
    fontWeight: '600',
  },
  viewCategories: {
    paddingVertical: 10,
  },
  btnView: {
    backgroundColor: '#52BD94',
    padding: 12,
    marginVertical: 5,
    borderRadius: 10,
  },
  btnText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '500',
    justifyContent: 'center',
    textAlign: 'center',
  },
});

export default Question;
