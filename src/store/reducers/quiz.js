import {
  FETCH_QUIZES_ERROR,
  FETCH_QUIZES_START,
  FETCH_QUIZES_SUCCESS,
  FETCH_QUIZ_SUCCESS,
  FETCH_QUIZ_START,
  SET_ANSWER_STATE,
  SET_RESULTS,
  NEXT_QUESTION,
  FINISH_QUIZ,
  RESET_QUIZ,
} from "../actions/actionTypes";

const initialState = {
  isLoaded: false,
  quizes: [],
  error: null,
  title: "Quiz",
  activeQuestion: 0,
  answerState: null,
  isQuizFinished: false,
  isQuizLoaded: false,
  results: {},
  quiz: [],
};

export function quizReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_QUIZES_START:
      return { ...state, isLoaded: false };
    case FETCH_QUIZ_START:
      return { ...state, isQuizLoaded: false };
    case FETCH_QUIZES_SUCCESS:
      return { ...state, isLoaded: true, quizes: action.quizes };
    case FETCH_QUIZ_SUCCESS:
      return {
        ...state,
        title: action.title,
        quiz: action.quiz,
        isQuizLoaded: true,
      };
    case FETCH_QUIZES_ERROR:
      return { ...state, isLoaded: true, error: action.error };
    case SET_ANSWER_STATE:
      return { ...state, answerState: action.answerState };
    case SET_RESULTS:
      return { ...state, results: action.results };
    case NEXT_QUESTION:
      return {
        ...state,
        activeQuestion: action.activeQuestion,
        answerState: action.answerState,
      };
    case FINISH_QUIZ:
      return {
        ...state,
        isQuizFinished: action.isQuizFinished,
        title: action.title,
      };
    case RESET_QUIZ:
      return {
        ...state,
        activeQuestion: 0,
        answerState: null,
        isQuizFinished: false,
        results: {},
        title: action.props.title.replace(" is finished!", ""),
      };
    default:
      return state;
  }
}
