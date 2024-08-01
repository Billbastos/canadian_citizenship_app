import React, { useRef, useEffect } from 'react';
import { StyleSheet, View, Text, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Footer from '../Footer';

const Template = ({
  children,
  footer,
  headerTitle,
  overrides = { main: {}, content: {} },
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <LinearGradient
      colors={['#1C0732', '#280a49', '#350d5f']}
      style={{ flex: 1 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <Animated.View // Special animatable View
        style={[
          styles.main,
          {
            ...overrides.main,
            opacity: fadeAnim, // Bind opacity to animated value
          },
        ]}
      >
        {Boolean(headerTitle) && (
          <Text style={styles.headerTxt}>{headerTitle}</Text>
        )}
        <View style={[styles.content, { ...overrides.content }]}>
          {children}
        </View>
        {Boolean(footer) && (
          <Footer overrides={{ flexDirection: 'row', alignSelf: 'flex-end' }}>
            {footer}
          </Footer>
        )}
      </Animated.View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  main: {
    height: '100%',
    flexDirection: 'column',
  },
  content: {
    margin: 20,
    flex: 1,
    height: '100%',
  },
  headerTxt: {
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
    color: '#fff',
    marginVertical: 10,
  },
});

export default Template;
