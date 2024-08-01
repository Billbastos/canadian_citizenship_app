import React, { useState, useEffect } from 'react';
import { getData, storeData } from '../services/async-storage-service';
import { Text, StyleSheet, View, Image, Dimensions } from 'react-native';
import Tip from '../components/Tip';
import Button from '../components/Button';
import * as Template from '../components/Template';

const HomeScreen = ({ navigation }) => {
  const [isTipEnabled, setTipEnabled] = useState(null);
  const windowWidth = Dimensions.get('window').width;
  const wLogo = windowWidth < 480 ? 190 : 240;
  const hLogo = windowWidth < 480 ? 95 : 121;

  useEffect(() => {
    getData('tips').then((d) => {
      if (d === null) {
        setTipEnabled(true);
        storeData('tips', true);
      } else {
        setTipEnabled(d);
      }
    });
    return () => setTipEnabled(null);
  }, []);

  return (
    <Template.Base
      overrides={{
        main: { flexDirection: 'column' },
        content: { justifyContent: 'center' },
      }}
    >
      <>
        <View style={styles.row}>
          <Image
            source={require('./assets/logo.png')}
            style={{ width: wLogo, height: hLogo }}
            resizeMode="cover"
          />
        </View>
        <View style={{ flex: 3, justifyContent: 'center' }}>
          <Text style={styles.text}>
            Check your knowledge for the Canadian Citizenship test
          </Text>
          <Button
            title="Start test"
            action={() => navigation.navigate('Test')}
            overrides={{ fontSize: 16 }}
          />
          <Button
            title="Settings"
            action={() => navigation.navigate('Settings')}
            overrides={{ fontSize: 16 }}
          />
          <Button
            title="Report"
            action={() => navigation.navigate('Report')}
            overrides={{ fontSize: 16 }}
          />
        </View>
        {isTipEnabled && <Tip />}
      </>
    </Template.Base>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    padding: 25,
    color: '#fff',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingVertical: 5,
    paddingTop: 20,
    paddingLeft: 5,
  },
});

export default HomeScreen;
