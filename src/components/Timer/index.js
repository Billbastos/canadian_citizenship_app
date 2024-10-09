import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Icon from '../Icon';
import { useTimeContext } from '../../context/TimeContext';

const Timer = () => {
  const { setExpired, questions } = useTimeContext();
  const [timer, setTimer] = useState(null);
  const [isEndOfTime, setEndOfTime] = useState(null);

  useEffect(() => {
    if (isEndOfTime) {
      setExpired(isEndOfTime);
    }
  }, [isEndOfTime]);

  useEffect(() => {
    const id = setInterval(() => {
      setTimer((tm) => {
        let sec = (tm && tm.seconds) || 0;
        let min = (tm && tm.minutes) || 0;
        let hou = (tm && tm.hours) || 0;
        if (hou <= 0 && min <= 0 && sec <= 0) {
          setEndOfTime(true);
          clearInterval(id);
          return {
            hours: 0,
            seconds: 0,
            minutes: 0,
          };
        }
        sec -= 1;
        if (min < 0) {
          min = 59;
          hou = hou - 1;
        }
        if (sec < 0) {
          sec = 59;
          min = min - 1;
        }
        return {
          seconds: sec,
          minutes: min,
          hours: hou,
        };
      });
    }, 1000);
    return () => {
      clearInterval(id);
      setTimer(null);
    };
  }, []);

  useEffect(() => {
    const minutes = parseInt(questions * 1.5, 10);
    setTimer({
      hours: minutes - 60 > 0 ? parseInt(minutes / 60, 10) : 0,
      minutes: minutes - 60 > 0 ? parseInt(((minutes / 60) % 1) * 60) : minutes,
      seconds: 0,
    });
  }, [questions]);

  const getSeconds = () => {
    if (!timer || !timer.seconds) {
      return `00`;
    }
    if (timer.seconds < 10) {
      return `0${timer.seconds}`;
    }
    return timer.seconds;
  };

  const getMinutes = () => {
    if (!timer || !timer.minutes) {
      return `00`;
    }
    if (timer.minutes < 10) {
      return `0${timer.minutes}`;
    }
    return timer.minutes;
  };

  const getHours = () => {
    if (!timer || !timer.hours) {
      return `0`;
    }
    return timer.hours;
  };

  return (
    <View style={styles.main}>
      <Icon
        name="clock"
        size={14}
        stroke={2}
        color="#1C0732"
        overrides={{ padding: 0, paddingRight: 5 }}
      />
      <Text style={styles.clock}>
        {getHours()}:{getMinutes()}:{getSeconds()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignItems: 'center',
  },
  clock: {
    fontWeight: '500',
    fontSize: 16,
    minWidth: 70,
    textAlign: 'left',
    color: '#1C0732',
    margin: 'auto',
  },
});

export default Timer;
