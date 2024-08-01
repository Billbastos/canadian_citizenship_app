import React, { useState } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import Button from '../../components/Button';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from '../../components/Icon';

const SelectQuestions = ({ data, getAll, getBy, getDefault, getSelected }) => {
  const [selectedCategory, setSelectedCategory] = useState('');

  const categories = [
    'people',
    'geography',
    'history',
    'politics',
    'citizenship',
    'government',
    'rights and responsibilities',
    'dates',
    'places',
    'culture',
    'economy',
    'symbols',
  ];

  return (
    <View style={styles.main}>
      <Text style={styles.textHeader}>
        Select the test you would like to start
      </Text>
      <Button
        title="Start exam ( 20 questions )"
        action={getDefault}
        overrides={{ fontSize: 16 }}
      />
      <Button
        title={`Start all ${data.allQuestions.length} questions`}
        action={getAll}
        overrides={{ fontSize: 16 }}
      />
      <Text style={[styles.textHeader, { paddingBottom: 0, paddingTop: 35 }]}>
        Start a test choosing a category from the list below
      </Text>
      <View style={styles.row}>
        <SelectDropdown
          buttonStyle={styles.dropDown}
          buttonTextStyle={{ color: '#fff', fontSize: 18, paddingLeft: 25 }}
          defaultButtonText="Select a category"
          data={categories}
          renderDropdownIcon={() => <Icon name="angleDown" color="#fff" />}
          onSelect={(selectedItem) => {
            setSelectedCategory(selectedItem);
            getSelected(selectedItem);
          }}
          buttonTextAfterSelection={(selectedItem) => {
            return selectedItem;
          }}
          rowTextForSelection={(item) => {
            return item;
          }}
        />
      </View>
      {selectedCategory ? (
        <Button
          title={`Start all ${
            data.size ? data.size : ``
          } ${selectedCategory} questions`}
          action={() => getBy(selectedCategory)}
          overrides={{ fontSize: 16 }}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  textHeader: {
    fontSize: 20,
    fontWeight: '500',
    paddingVertical: 20,
    textAlign: 'center',
    color: '#fff',
  },
  btnView: {
    backgroundColor: '#52BD94',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
  },
  btnText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '500',
    justifyContent: 'center',
    textAlign: 'center',
  },
  dropDown: {
    backgroundColor: 'transparent',
    flex: 1,
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    borderColor: '#fff',
    borderStyle: 'solid',
    borderWidth: 1,
  },
});

export default SelectQuestions;
