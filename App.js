import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Icon from './src/components/Icon';
import HomeScreen from './src/screens/HomeScreen';
import ReportScreen from './src/screens/Report';
import SettingsScreen from './src/screens/Settings';
import TestScreen from './src/screens/Test';
import { StyleSheet, View } from 'react-native';
import { RootSiblingParent } from 'react-native-root-siblings';
import Timer from './src/components/Timer';
import TimerContext from './src/context/TimeContext';
import { getData } from './src/services/async-storage-service';

const Tab = createBottomTabNavigator();

const App = () => {
  const [showTimer, setShowTimer] = useState(false);
  const [questions, setQuestions] = useState(0);
  const [expired, setExpired] = useState(false);
  const [isEnabled, setEnabled] = useState(false);
  const value = {
    showTimer,
    setShowTimer,
    questions,
    setQuestions,
    expired,
    setExpired,
    isEnabled,
    setEnabled,
  };

  useEffect(() => {
    getData('timer').then((t) => {
      setEnabled(t);
    });
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: '#1C0732' }}>
      <TimerContext.Provider value={value}>
        <RootSiblingParent>
          <NavigationContainer>
            <Tab.Navigator
              screenOptions={({ route }) => ({
                unmountOnBlur: true,
                tabBarStyle: styles.tabBar,
                tabBarIcon: ({ focused }) => (
                  <Icon
                    name={route.name.toLowerCase()}
                    label={route.name}
                    color={focused ? '#fff' : '#c8a0f2'}
                    size={20}
                  />
                ),
                tabBarBackground: () => (
                  <View
                    style={[
                      StyleSheet.absoluteFill,
                      { backgroundColor: '#1C0732' },
                    ]}
                  />
                ),
                headerBackground: () => (
                  <View
                    style={[
                      StyleSheet.absoluteFill,
                      { backgroundColor: '#c9c1d1' },
                    ]}
                  />
                ),
                headerTintColor: '#1C0732',
                tabBarShowLabel: false,
                tabBarActiveTintColor: '#fff',
                tabBarInactiveTintColor: '#c8a0f2',
              })}
            >
              <Tab.Screen name="Home" component={HomeScreen} />
              <Tab.Screen
                name="Test"
                component={TestScreen}
                options={{
                  headerRight: () =>
                    Boolean(value.showTimer && value.isEnabled) && <Timer />,
                }}
              />
              <Tab.Screen name="Report" component={ReportScreen} />
              <Tab.Screen name="Settings" component={SettingsScreen} />
            </Tab.Navigator>
          </NavigationContainer>
        </RootSiblingParent>
      </TimerContext.Provider>
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    paddingTop: 8,
    paddingBottom: 15,
    elevation: 0,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    borderTopWidth: 0,
  },
});

export default App;
