import React, { useCallback, useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Text, Alert, Switch, Linking } from 'react-native';
import { clear, storeData, getData } from '../services/async-storage-service';
import TimerContext from '../context/TimeContext';

import Toast from 'react-native-root-toast';
import * as Template from '../components/Template';
import Button from '../components/Button';

const Settings = () => {
  const { setEnabled, isEnabled } = useContext(TimerContext);
  const [isTipEnabled, setTipEnabled] = useState(false);

  useEffect(() => {
    getData('tips').then((d) => {
      if (d === null) {
        setTipEnabled(true);
        storeData('tips', true);
      } else {
        setTipEnabled(d);
      }
    });
  }, []);

  const remove = () => {
    Alert.alert(
      'Clear all report data',
      'Are you sure you want to remove all your history data?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Yes, please',
          style: 'destructive',
          onPress: () => {
            clear('report').then(() => {
              Toast.show('All historic data deleted', {
                duration: Toast.durations.SHORT,
              });
            });
          },
        },
      ]
    );
  };

  const toggleTimer = () => {
    storeData('timer', !isEnabled);
    setEnabled(!isEnabled);
  };

  const toggleTips = () => {
    storeData('tips', !isTipEnabled);
    setTipEnabled(!isTipEnabled);
  };

  const openURL = useCallback(async () => {
    await Linking.openURL(
      `https://www.canada.ca/content/dam/ircc/migration/ircc/english/pdf/pub/discover.pdf`
    );
  });

  return (
    <Template.Base>
      <View>
        <View style={styles.row}>
          <View style={{ flex: 2, paddingRight: 10 }}>
            <Text style={styles.textConfigLabel}>Timer</Text>
            <Text style={styles.textConfigDescription}>
              This will add a timer to the questionnaire, which will fail all
              remaining questions if the time runs out.
            </Text>
          </View>
          <View style={{ paddingLeft: 5 }}>
            <Switch
              trackColor={{ false: '#6e4597', true: '#fff' }}
              thumbColor={isEnabled ? '#009a9a' : '#e0e0e0'}
              ios_backgroundColor="#6e4597"
              onValueChange={toggleTimer}
              value={isEnabled}
            />
          </View>
        </View>
        <View style={styles.row}>
          <View style={{ flex: 2, paddingRight: 10 }}>
            <Text style={styles.textConfigLabel}>Tips</Text>
            <Text style={styles.textConfigDescription}>
              This will enable tips on the home screen.
            </Text>
          </View>
          <View style={{ paddingLeft: 5 }}>
            <Switch
              trackColor={{ false: '#6e4597', true: '#fff' }}
              thumbColor={isTipEnabled ? '#009a9a' : '#e0e0e0'}
              ios_backgroundColor="#6e4597"
              onValueChange={toggleTips}
              value={isTipEnabled}
            />
          </View>
        </View>
        <View style={styles.row}>
          <View style={{ flex: 2, paddingRight: 10 }}>
            <Text style={styles.textConfigLabel}>History</Text>
            <Text style={styles.textConfigDescription}>
              Clear all report data. This will clear all tests you have made so
              far.
            </Text>
          </View>
          <View style={{ paddingLeft: 5, marginTop: 8 }}>
            <Button
              action={remove}
              icon={{ name: 'trash', size: 20 }}
              overrides={{ margin: 'auto' }}
            />
          </View>
        </View>
      </View>
      <View style={{ flex: 2, justifyContent: 'flex-end' }}>
        <View style={{ paddingLeft: 5, marginTop: 8 }}>
          <Button
            action={openURL}
            icon={{ name: 'external', size: 16, stroke: 3 }}
            overrides={{ fontSize: 16 }}
            title={`Discovery Canada guide `}
          />
        </View>
      </View>
    </Template.Base>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  textConfigLabel: {
    fontSize: 18,
    fontWeight: '500',
    color: '#fff',
    paddingRight: 10,
  },
  textConfigDescription: {
    fontSize: 13,
    fontWeight: '200',
    color: '#c8a0f2',
    paddingTop: 10,
    paddingRight: 10,
  },
});

export default Settings;
