import React from 'react';

const TimerContext = React.createContext({
  showTimer: false,
  setShowTimer: () => {},
  expired: false,
  setExpired: () => {},
  questions: 0,
  setQuestions: () => {},
  isEnabled: false,
  setEnabled: () => {},
});

export default TimerContext;
