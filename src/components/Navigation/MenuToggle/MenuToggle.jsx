import React from "react";
import classes from "./MenuToggle.module.scss";

export default (props) => {
  let cls = ["fa", classes.MenuToggle];

  if (props.isOpen) {
    cls.push(classes.open);
    cls.push("fa-times");
  } else {
    cls.push("fa-bars");
  }

  return <i className={cls.join(" ")} onClick={props.onToggle}></i>;
};
