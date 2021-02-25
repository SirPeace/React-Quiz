import React from "react";
import { Link } from "react-router-dom";
import classes from "./NotFound.module.scss";

export default function NotFound() {
  return (
    <div className={`${classes.QuizList} ${classes.NotFound}`}>
      <div>
        <h1>404</h1>
        <p>
          <i>Are you lost, dear?</i>{" "}
          <Link to="/" className={classes.link}>
            Get back
          </Link>
        </p>
      </div>
    </div>
  );
}
