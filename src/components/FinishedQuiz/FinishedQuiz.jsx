import React from "react";
import classes from "./FinishedQuiz.module.scss";
import Button from "../UI/Button/Button";
import { Link } from "react-router-dom";

export default (props) => {
  const rightAnswerIDsCount = Object.values(props.results).reduce(
    (accumulator, value, index) => {
      if (value === props.quiz[index].rightAnswerID) accumulator++;
      return accumulator;
    },
    0
  );

  let answers = [];
  props.quiz.forEach((quizItem, index) => {
    let colorClass =
      props.results[index + 1] === quizItem.rightAnswerID
        ? classes.correct
        : classes.wrong;

    let icon =
      props.results[index + 1] === quizItem.rightAnswerID
        ? "fa-check"
        : "fa-times";

    let userAnswer = quizItem.answers[props.results[index + 1] - 1].text;

    let isRight = props.results[index + 1] !== quizItem.rightAnswerID;

    answers[index] = {
      userAnswer,
      colorClass,
      icon: `fa ${icon} ${colorClass}`,
      isRight,
    };
  });

  return (
    <div className={classes.FinishedQuiz}>
      <h2>Results</h2>
      <p className={classes.results}>
        <strong>{rightAnswerIDsCount}</strong> correct answer
        {rightAnswerIDsCount === 1 ? null : "s"} out of{" "}
        <strong>{props.quiz.length}</strong>
      </p>

      <ol className={classes.answers}>
        {props.quiz.map((quizItem, index) => (
          <li key={index}>
            <div className={`${classes.userAnswer}`}>
              <span className={classes.question}>
                {quizItem.question}&nbsp;
              </span>
              <strong
                className={`${classes.answerText} ${answers[index].colorClass}`}
              >
                {answers[index].userAnswer}
              </strong>
              <i className={answers[index].icon}></i>
            </div>

            {props.results[index + 1] !== quizItem.rightAnswerID ? (
              <React.Fragment>
                <div className={classes.correctAnswer}>
                  Correct answer is:&nbsp;
                  <strong className={classes.correct}>
                    {quizItem.answers[quizItem.rightAnswerID - 1].text}
                  </strong>
                  <p className={classes.description}>{quizItem.note}</p>
                </div>
              </React.Fragment>
            ) : null}
          </li>
        ))}
      </ol>

      <Button onClick={props.resetQuiz} className={classes.button}>
        Try again!
      </Button>

      <Link to="/">
        <Button state="primary" className={classes.button}>
          Back to tests list
        </Button>
      </Link>
    </div>
  );
};
