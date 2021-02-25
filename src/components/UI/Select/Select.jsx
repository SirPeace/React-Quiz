import React from "react";
import classes from "./Select.module.scss";

export default function Select(props) {
  const selectID = `Select-${props.label}-${Math.random()}`;

  const options = props.options.map((option, index) => (
    <option value={option.value} key={index}>
      {option.text}
    </option>
  ));

  return (
    <div className={classes.Select}>
      <label htmlFor={selectID}>{props.label}</label>
      <select id={selectID} value={props.value} onChange={props.onChange}>
        {options}
      </select>
    </div>
  );
}
