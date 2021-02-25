import React from "react";
import classes from "./Backdrop.module.scss";

export default (props) => {
  return <div className={classes.Backdrop} onClick={props.showBackdrop}></div>;
};
