import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { Gift } from 'react-native-feather';
import _ from 'lodash';

const Tip = () => {
  const [currentTip, setCurrentTip] = useState({
    id: 0,
    text: '',
  });

  const [tips, setTips] = useState(
    _.shuffle([
      {
        id: 1,
        text: 'All of the questions in this app were taken from the study guide Discovery Canada: Citizenship Rights and Responsibilities. Because the questions on the real test will not be same, we strongly advise you to study the guide first and then take the test. When you are familiar with all of the questions and have a score of at least 75%, you may be ready to take the real test.',
      },
      {
        id: 2,
        text: 'The only official study guide for citizenship test is Discovery Canada: The Rights and Responsibilities of Citizenship, available from Citizenship and Immigration Canada at no cost. If you have applied for citizenship and are preparing for the test, your primary resource should be the official study guide. If you use any other material to prepare for the citizenship test, you do so at your own risk.',
      },
      {
        id: 3,
        text: 'Visit the Citizenship and Immigration website at www.cic.gc.ca. Discover Canada can be downloaded from this website.',
      },
      {
        id: 4,
        text: 'This app offers questions by category, this is a good way to improve some areas that you are not there yet. Try different categories and check the report to guide your studies.',
      },
      {
        id: 5,
        text: 'Check your time. This app has a timer that simulates the same time you have to complete the real test. Enable timer on settings to create a similar experience as the real test.',
      },
      {
        id: 6,
        text: "If you are unsure about an answer on the real test, you can skip that question and come back to finish it later. This option is not available in the app, making it a little more difficult than the real test. If you're not sure about an answer on the real test, don't waste time on it; instead, answer the questions you know and come back later to finish the remainder.",
      },
    ])
  );

  useEffect(() => {
    setCurrentTip(tips.filter((f) => !f.read)[0]);
  }, []);

  const setReadTip = () => {
    const tTips = tips.map((t) => {
      if (t.id === currentTip.id) {
        t.read = true;
      }
      return t;
    });
    const tip = tTips.filter((f) => !f.read)[0];
    setCurrentTip(tip);
    setTips([...tTips]);
  };

  return currentTip && !currentTip.read ? (
    <ScrollView style={{ flex: 1 }} fadingEdgeLength={35}>
      <View>
        <View style={styles.columnCenter}>
          <Text style={styles.text} onPress={setReadTip}>
            <Text style={{ fontSize: 14 }}>
              <Gift
                stroke="rgb(200,160,242)"
                strokeWidth={2}
                width={16}
                height={16}
                fill="rgba(200,160,242, .2)"
              />
              <Text
                style={{ fontWeight: '700', fontSize: 16 }}
              >{` Tip: `}</Text>
              {currentTip.text}
            </Text>
          </Text>
        </View>
      </View>
    </ScrollView>
  ) : null;
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
    paddingHorizontal: 7,
  },
  text: {
    color: '#c8a0f2',
  },
});

export default Tip;
