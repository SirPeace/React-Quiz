import React from "react";
import classes from "./ActiveQuiz.module.scss";
import AnswersList from "./AnswersList/AnswersList";

export default (props) => (
  <div className={classes.ActiveQuiz}>
    <div className={classes.question}>
      <h2>
        <strong>{props.questionNumber}.</strong>&nbsp;{props.question}
      </h2>

      <span>
        {props.questionNumber} out of {props.questionsCount}
      </span>
    </div>

    <AnswersList
      answers={props.answers}
      answerState={props.answerState}
      onAnswerClick={props.onAnswerClick}
    />
  </div>
);
