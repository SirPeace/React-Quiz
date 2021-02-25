import React from "react";
import classes from "./Button.module.scss";

export default (props) => {
  let cls = [classes.Button, classes[props.state], props.className];

  if (props.disabled) cls.push(classes.disabled);

  return (
    <button
      className={cls.join(" ")}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};
