import { combineReducers } from "redux";
import { authReducer } from "./auth";
import { createQuizReducer } from "./createQuiz";
import { quizReducer } from "./quiz";

export default combineReducers({
  quiz: quizReducer,
  createQuiz: createQuizReducer,
  auth: authReducer,
});
