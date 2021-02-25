import React from "react";
import classes from "./AnswerItem.module.scss";

export default (props) => {
  const dynamicClasses = [classes[props.state], classes.AnswerItem];

  return (
    <li
      className={dynamicClasses.join(" ")}
      onClick={() => props.onAnswerClick(props.answer.id)}
    >
      {props.answer.text}
    </li>
  );
};
