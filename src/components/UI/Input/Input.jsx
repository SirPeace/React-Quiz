import React from "react";
import classes from "./Input.module.scss";

function isInvalid({ valid, touched, shouldValidate }) {
  return !valid && touched && shouldValidate;
}

export default (props) => {
  const cls = [classes.Input];
  const inputType = props.type || "text";
  const htmlFor = `Input-${inputType}-${Math.random()}`;

  if (isInvalid(props)) {
    cls.push(classes.invalid);
  }

  if (props.type === "textarea") {
    return (
      <div className={cls.join(" ")}>
        <label htmlFor={htmlFor}>{props.label}</label>
        <textarea
          id={htmlFor}
          disabled={props.disabled}
          value={props.value}
          onChange={props.onChange}
          click={props.onClick}
          placeholder={props.placeholder}
        />
        {isInvalid(props) ? (
          <small>{props.errorMessage || "Incorrect value"}</small>
        ) : null}
      </div>
    );
  } else {
    return (
      <div className={cls.join(" ")}>
        <label htmlFor={htmlFor}>{props.label}</label>
        <input
          id={htmlFor}
          type={inputType}
          disabled={props.disabled}
          value={props.value}
          onChange={props.onChange}
          click={props.onClick}
          placeholder={props.placeholder}
        />
        {isInvalid(props) ? (
          <small>{props.errorMessage || "Incorrect value"}</small>
        ) : null}
      </div>
    );
  }
};
