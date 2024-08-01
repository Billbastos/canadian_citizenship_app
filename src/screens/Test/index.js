import React, { useReducer, useContext, useEffect } from 'react';
import Question from './Question';
import SelectQuestions from './SelectQuestions';
import Badge from '../../components/Badge';
import Result from './Result';
import * as Template from '../../components/Template';
import { saveReport } from '../../services/report-service';
import questionReducer from './question-reducer';
import TimerContext from '../../context/TimeContext';
import _ from 'lodash';

import data from '../../questions.json';

const _data = _.shuffle(data.allQuestions);

const initialState = {
  allQuestions: _data,
  question: null,
  score: 0,
  qIdx: 1,
  last: false,
};

const Test = () => {
  const [state, dispatch] = useReducer(questionReducer, initialState);
  const { setShowTimer, setQuestions, expired, setExpired } =
    useContext(TimerContext);

  useEffect(() => {
    setShowTimer(false);
  }, []);

  useEffect(() => {
    setQuestions(state.allQuestions.length);
  }, [state]);

  useEffect(() => {
    if (expired) {
      dispatch({ type: 'reset-scored-questions' });
      saveReport(state.allQuestions);
      setExpired(false);
    }
  }, [expired]);

  const getAllQuestions = () => {
    dispatch({ type: 'get-all-questions' });
    setShowTimer(true);
  };

  const getDefaultQuestions = () => {
    dispatch({ type: 'get-default-questions' });
    setShowTimer(true);
  };

  const getByCategory = (category) => {
    dispatch({
      type: 'get-by-category',
      payload: { category: category },
    });
    setShowTimer(true);
  };

  const getSelectedCategory = (category) => {
    dispatch({
      type: 'select-by-category',
      payload: { category: category },
    });
  };

  const renderQuestion = () => {
    if (!state.last) {
      return (
        <>
          <Question
            item={state.question}
            update={(_id, _isCorrect) =>
              dispatch({
                type: 'update-question',
                payload: { id: _id, isCorrect: _isCorrect },
              })
            }
            getNextQuestion={getNext}
            number={state.qIdx}
          />
        </>
      );
    } else {
      return <Result data={state.allQuestions} />;
    }
  };

  const renderSelectQuestion = () => {
    return (
      <SelectQuestions
        data={state}
        getAll={() => getAllQuestions()}
        getDefault={() => getDefaultQuestions()}
        getBy={(_category) => getByCategory(_category)}
        getSelected={(_category) => getSelectedCategory(_category)}
      />
    );
  };

  const getNext = async () => {
    if (state.qIdx >= state.allQuestions.length) {
      dispatch({ type: 'set-last-question' });
      saveReport(state.allQuestions);
      setShowTimer(false);
      return;
    }
    dispatch({
      type: 'set-next-question',
      payload: {
        question: state.allQuestions.slice(state.qIdx, state.qIdx + 1)[0],
      },
    });
  };

  return (
    <Template.Base
      footer={
        !state.last &&
        state.allQuestions.length > 0 && (
          <Badge
            color="#1c0732"
            shadowColor="#120521"
            fontColor="#fff"
            label={`Score: ${state.score}`}
            overrides={{ alignSelf: 'flex-end' }}
          />
        )
      }
    >
      {!state.question ? renderSelectQuestion() : renderQuestion()}
    </Template.Base>
  );
};

export default Test;
