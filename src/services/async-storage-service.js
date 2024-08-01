import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (key, value) => {
  try {
    const jsonVal = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonVal);
  } catch (e) {
    console.log(`Error on store data: ${e}`);
  }
};

const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (e) {
    console.log(`Error on get data: ${e}`);
  }
};

const clearAll = async () => {
  try {
    await AsyncStorage.clear();
    console.log(`Clearing data`);
  } catch (e) {
    console.log(`Error on clearing data: ${e}`);
  }
};

const clear = async (item) => {
  try {
    await AsyncStorage.removeItem(item);
    console.log(`Clearing ${item}`);
  } catch (e) {
    console.log(`Error on clearing data: ${e}`);
  }
};

export { getData, storeData, clearAll, clear };
