import axios from "../../axios/axiosQuiz";
import { MODIFY_QUIZ } from "./actionTypes";

export function addQuestion(quiz) {
  return {
    type: MODIFY_QUIZ,
    quiz,
  };
}

export function addQuiz() {
  return async (dispatch, getState) => {
    try {
      await axios.post(
        "https://react-quiz-f17c6.firebaseio.com/quiz.json",
        getState().createQuiz.quiz
      );

      dispatch(resetQuizCreator());
    } catch (e) {
      console.error("Quiz saving failed!", e.message);
    }
  };
}

export function resetQuizCreator() {
  return {
    type: MODIFY_QUIZ,
    quiz: { title: "", questions: [] },
  };
}
