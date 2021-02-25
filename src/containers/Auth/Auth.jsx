import React, { Component } from "react";
import Button from "../../components/UI/Button/Button";
import classes from "./Auth.module.scss";
import is from "is_js";
import FormHelper from "../../form/FormHelper";
import { connect } from "react-redux";
import { authorize } from "../../store/actions/auth";

class Auth extends Component {
  state = {
    formControls: {
      email: {
        value: "",
        type: "email",
        label: "Email",
        errorMessage: "Incorrect email",
        valid: false,
        touched: false,
        validation: {
          required: true,
          email: true,
        },
      },
      password: {
        value: "",
        type: "password",
        label: "Password",
        errorMessage: "Incorrect password",
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 6,
        },
      },
    },
  };

  loginHandler = async () => {
    const requestData = {
      email: this.state.formControls.email.value,
      password: this.state.formControls.password.value,
      returnSecureToken: true,
    };

    this.props.authorize(requestData, true);
  };

  signUpHandler = async () => {
    const requestData = {
      email: this.state.formControls.email.value,
      password: this.state.formControls.password.value,
      returnSecureToken: true,
    };

    this.props.authorize(requestData, false);
  };

  validate(rules, value) {
    if (rules.required && value === "") {
      return [false, "This field is required!"];
    }

    if (rules.email && !is.email(value)) {
      return [false, "This field must be a valid email address!"];
    }

    if (rules.minLength && value.length < rules.minLength) {
      return [
        false,
        `This field must be at least ${rules.minLength} characters long!`,
      ];
    }

    return [true];
  }

  onChangeHandler = (event, name) => {
    const formControls = { ...this.state.formControls };
    const formControl = { ...formControls[name] };
    formControl.touched = true;
    formControl.value = event.target.value;

    [formControl.valid, formControl.errorMessage] = this.validate(
      formControl.validation,
      event.target.value
    );

    formControls[name] = formControl;
    this.setState({ formControls });
  };

  renderInputs() {
    return Object.keys(this.state.formControls).map((name, index) =>
      FormHelper.renderFormControl(
        this.state.formControls[name],
        index,
        null,
        null,
        this.onChangeHandler,
        name
      )
    );
  }

  render() {
    const disabled = Object.values(this.state.formControls).some(
      (control) => control.valid === false
    );

    return (
      <div className={classes.Auth}>
        <div>
          <h1>Authorization</h1>
          <form onSubmit={(e) => e.preventDefault()}>
            {this.renderInputs()}

            <div className={classes.buttons}>
              <Button
                state="primary"
                onClick={this.loginHandler}
                disabled={disabled}
              >
                Log in
              </Button>
              <Button
                state="success"
                onClick={this.signUpHandler}
                disabled={disabled}
              >
                Sign up
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  authorize: (data, isLogin) => dispatch(authorize(data, isLogin)),
});

export default connect(null, mapDispatchToProps)(Auth);
