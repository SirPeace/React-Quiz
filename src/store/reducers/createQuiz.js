import { MODIFY_QUIZ } from "../actions/actionTypes";

const initialState = {
  quiz: {
    title: "",
    questions: [],
  },
};

export function createQuizReducer(state = initialState, action) {
  switch (action.type) {
    case MODIFY_QUIZ:
      return { ...state, quiz: action.quiz };
    default:
      return state;
  }
}
