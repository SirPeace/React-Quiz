import React from "react";
import classes from "./AnswersList.module.scss";
import AnswerItem from "./AnswerItem/AnswerItem";

export default (props) => {
  const answerElements = props.answers.map((answer, index) => (
    <AnswerItem
      answer={answer}
      key={index}
      onAnswerClick={props.onAnswerClick}
      state={props.answerState ? props.answerState[answer.id] : ""}
    />
  ));

  return <ul className={classes.AnswersList}>{answerElements}</ul>;
};
