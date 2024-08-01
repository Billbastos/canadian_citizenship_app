import _ from 'lodash';

const questionReducer = (state, action) => {
  // state: { allQuestions: [], question: {}, score: 0, qIdx: 1, last: false }
  // payload: { category: "",  id: 0, isCorrect: true, question: ""}
  switch (action.type) {
    case 'get-all-questions':
      return {
        ...state,
        question: _.shuffle(state.allQuestions).slice(0, 1)[0],
      };
    case 'get-default-questions':
      const defaultList = _.shuffle(state.allQuestions);
      return {
        ...state,
        allQuestions: defaultList.slice(0, 20),
        question: defaultList.slice(0, 1)[0],
      };
    case 'get-by-category':
      const categoryList = _.shuffle(state.allQuestions);
      const dataCategory = [
        ...categoryList.filter((q) =>
          q.categories.includes(action.payload.category)
        ),
      ];
      return {
        ...state,
        allQuestions: dataCategory,
        question: dataCategory.slice(0, 1)[0],
      };
    case 'update-question':
      const arr = state.allQuestions.map((m) => {
        if (m.id === action.payload.id) {
          m.isCorrect = action.payload.isCorrect;
        }
        return m;
      });
      return {
        ...state,
        allQuestions: [...arr],
        score: action.payload.isCorrect ? state.score + 1 : state.score,
      };
    case 'set-last-question':
      return {
        ...state,
        last: true,
      };
    case 'set-next-question':
      return {
        ...state,
        qIdx: state.qIdx + 1,
        question: action.payload.question,
      };
    case 'reset-scored-questions':
      const first = state.allQuestions.slice(0, state.qIdx);
      const second = state.allQuestions
        .slice(state.qIdx, state.allQuestions.length)
        .map((m) => {
          m.isCorrect = false;
          return m;
        });
      return {
        ...state,
        allQuestions: [...first, ...second],
        last: true,
      };
    case 'select-by-category':
      // const categoryList = _.shuffle(state.allQuestions);
      const selectedCategory = [
        ...state.allQuestions.filter((q) =>
          q.categories.includes(action.payload.category)
        ),
      ];
      return {
        ...state,
        size: selectedCategory.length,
      };
    default:
      return state;
  }
};

export default questionReducer;
