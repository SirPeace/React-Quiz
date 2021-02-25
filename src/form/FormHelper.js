import React from "react";
import Input from "../components/UI/Input/Input.jsx";

export default class FormHelper {
  /**
   * Create control object structured by default
   * @param {object} options
   * @param {object} validation
   * @returns {object} object
   */
  static createControl(options, validation) {
    return {
      value: "",
      ...options,
      validation,
      valid: !validation,
      touched: false,
    };
  }

  /**
   * Validate the input by given validation rules
   * @param {*} value input value
   * @param {object} validation object of validation rules
   * @returns {[ boolean, ?[string, string] ]} [true|false, ['validationRule', 'errorMessage']]
   */
  static validate(value, validation = null) {
    if (!validation) return [true];

    if (validation.required && value === "")
      return [false, ["required", "This field can't be empty!"]];

    return [true];
  }

  static validateForm(formControls) {
    let isFormValid = true;

    for (let control in formControls) {
      if (formControls.hasOwnProperty(control))
        isFormValid = formControls[control].valid && isFormValid;
    }

    return isFormValid;
  }

  /**
   * Render the input by given parameters
   * @param {Object} controlOptions Configuration options for Form Control
   * @param number Key of the input
   * @param appendBefore Element or content, appending before input
   * @param controlOptions Element or content, appending after input
   * @param {CallableFunction} onChangeCallback
   * @param callbackParameters Parameters to passed to callback function. First argument for it will be event by default
   * @returns JSX of Input component
   */
  static renderFormControl({
    controlOptions = {},
    key = 0,
    appendBefore = "",
    appendAfter = "",
    onChangeCallback = null,
    callbackParameters = [],
  } = {}) {
    // TODO: Turn parameter list into the object
    return (
      <React.Fragment key={key}>
        {appendBefore}
        <Input
          value={controlOptions.value}
          label={controlOptions.label}
          errorMessage={controlOptions.errorMessage}
          valid={controlOptions.valid}
          touched={controlOptions.touched}
          shouldValidate={!!controlOptions.validation}
          onChange={(event) => onChangeCallback(event, ...callbackParameters)}
          type={controlOptions.type}
          placeholder={controlOptions.placeholder}
        />
        {appendAfter}
      </React.Fragment>
    );
  }
}
