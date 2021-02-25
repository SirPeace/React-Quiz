import axios from "../../axios/axiosQuiz";
import {
  FETCH_QUIZES_ERROR,
  FETCH_QUIZES_START,
  FETCH_QUIZES_SUCCESS,
  FETCH_QUIZ_START,
  FETCH_QUIZ_SUCCESS,
  SET_ANSWER_STATE,
  SET_RESULTS,
  NEXT_QUESTION,
  FINISH_QUIZ,
  RESET_QUIZ,
} from "./actionTypes";

export function fetchQuizes() {
  return async (dispatch) => {
    dispatch(fetchQuizesStart());

    try {
      const response = await axios.get("quiz.json");

      dispatch(fetchQuizesSuccess({ quizes: response.data ?? [] }));
    } catch (e) {
      dispatch(fetchQuizesError(e.message));
    }
  };
}

export function fetchQuiz(id) {
  return async (dispatch) => {
    try {
      const response = await axios.get(`quiz/${id}.json`);

      const quiz = [];
      for (let [key, value] of Object.entries(response.data.questions)) {
        if (isFinite(key)) quiz[key] = value;
      }

      const state = {
        quiz,
        title: response.data.title,
      };

      dispatch(fetchQuizSuccess(state));
    } catch (error) {
      dispatch(fetchQuizesError(error));
    }
  };
}

export function fetchQuizesStart() {
  return {
    type: FETCH_QUIZES_START,
  };
}

export function fetchQuizStart() {
  return {
    type: FETCH_QUIZ_START,
  };
}

export function fetchQuizesSuccess(state) {
  return {
    type: FETCH_QUIZES_SUCCESS,
    quizes: state.quizes,
  };
}

export function fetchQuizSuccess(state) {
  return {
    type: FETCH_QUIZ_SUCCESS,
    title: state.title,
    quiz: state.quiz,
  };
}

export function fetchQuizesError(error) {
  return {
    type: FETCH_QUIZES_ERROR,
    error,
  };
}

export function setResults(results) {
  return {
    type: SET_RESULTS,
    results,
  };
}

export function setAnswerState(answerState) {
  return {
    type: SET_ANSWER_STATE,
    answerState,
  };
}

export function nextQuestion(options) {
  return {
    type: NEXT_QUESTION,
    ...options,
  };
}

export function finishQuiz(options) {
  return {
    type: FINISH_QUIZ,
    ...options,
  };
}

export function answerClickHandler(answerId) {
  return (dispatch, getState) => {
    const state = getState().quiz;

    if (state.answerState) {
      let answerState = Object.keys(state.answerState)[0];
      if (answerState === "success") return;
    }

    let question = state.quiz[state.activeQuestion];
    let answerState =
      answerId !== question.rightAnswerID
        ? { [answerId]: "error" }
        : { [answerId]: "success" };

    dispatch(setAnswerState(answerState));
    // this.setState({ answerState });

    if (answerId === question.rightAnswerID) {
      if (!state.results[question.id]) {
        let results = { ...state.results, [question.id]: answerId };
        dispatch(setResults(results));
        // this.setState({ results });
      }

      const timeout = window.setTimeout(() => {
        if (!isQuizFinished(state)) {
          const options = {
            activeQuestion: state.activeQuestion + 1,
            answerState: null,
          };

          dispatch(nextQuestion(options));
          // this.setState({
          //   activeQuestion: state.activeQuestion + 1,
          //   answerState: null,
          // });
        } else {
          const options = {
            isQuizFinished: true,
            title: `${state.title} is finished!`,
          };
          // this.setState({
          //   isQuizFinished: true,
          //   title: `${state.title} is finished!`,
          // });
          dispatch(finishQuiz(options));
        }
        window.clearTimeout(timeout);
      }, 1000);
    } else {
      let results = { ...state.results, [question.id]: answerId };
      dispatch(setResults(results));
      // this.setState({ results });
    }
  };
}

export function resetQuiz(props) {
  return { type: RESET_QUIZ, props };
}

function isQuizFinished(state) {
  return state.activeQuestion + 1 === state.quiz.length;
}
