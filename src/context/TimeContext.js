import React, { useContext } from 'react';

/*
  Could be using two separated Contexts here
  One for context and another for dispatch using reducer
  https://react.dev/learn/scaling-up-with-reducer-and-context
*/

const TimerContext = React.createContext({
  showTimer: false,
  setShowTimer: () => { },
  expired: false,
  setExpired: () => { },
  questions: 0,
  setQuestions: () => { },
  isEnabled: false,
  setEnabled: () => { },
});

const useTimeContext = () => {
  return useContext(TimerContext)
}

export {
  useTimeContext,
  TimerContext as default
}
