import React from "react";
import Button from "../../components/UI/Button/Button";
import Select from "../../components/UI/Select/Select";
import classes from "./QuizCreator.module.scss";
import FormHelper from "../../form/FormHelper.js";
import { connect } from "react-redux";
import { addQuestion, addQuiz } from "../../store/actions/createQuiz";

const createOptionControl = (number) => {
  return FormHelper.createControl(
    {
      label: `Answer ${number}`,
      errorMessages: {
        required: "The answer can't be empty!",
      },
      id: number,
    },
    { required: true }
  );
};

const createFormControls = () => ({
  quizTitle: FormHelper.createControl(
    {
      errorMessages: {
        required: "The title for the quiz is required!",
      },
      label: "The quiz title",
    },
    { required: true }
  ),
  question: FormHelper.createControl(
    {
      errorMessages: {
        required: "The question can't be empty!",
      },
      label: "The question",
    },
    { required: true }
  ),
  option_1: createOptionControl(1),
  option_2: createOptionControl(2),
  option_3: createOptionControl(3),
  option_4: createOptionControl(4),
  note: FormHelper.createControl({
    label: "Notes for incorrect answer",
    type: "textarea",
    placeholder: "This answer is right because...",
  }),
});

function QuizCreator(props) {
  const [state, setState] = React.useState({
    title: "",
    rightAnswerID: 1,
    isFormValid: false,
    formControls: createFormControls(),
  });

  const formControlChangeHandler = (event, controlName) => {
    const value = event.target.value;
    const formControls = { ...state.formControls };
    const control = { ...formControls[controlName] };

    let validationError;

    let title = state.title;
    if (controlName === "quizTitle") title = value;

    control.touched = true;
    control.value = value;
    [control.valid, validationError] = FormHelper.validate(
      value,
      control.validation
    );

    if (validationError) {
      const property = validationError[0];

      if (!control.errorMessages[property])
        control.errorMessage = validationError[1];
      else control.errorMessage = control.errorMessages[property];
    }

    formControls[controlName] = control;

    setState({
      ...state,
      formControls,
      isFormValid: FormHelper.validateForm(formControls),
      title,
    });
  };

  const selectChangeHandler = (value) => {
    setState({ ...state, rightAnswerID: +value });
  };

  const renderFormControls = () => {
    return Object.keys(state.formControls).map((controlName, index) => {
      const control = state.formControls[controlName];
      const appendAfter = index === 0 || index === 1 ? <hr /> : null;

      return FormHelper.renderFormControl(
        control,
        index,
        null,
        appendAfter,
        formControlChangeHandler,
        controlName
      );
    });
  };

  const addQuestionHandler = () => {
    const quiz = { ...props.quiz };
    const { question, option_1, option_2, option_3, option_4, note } = {
      ...state.formControls,
    };

    const index = props.quiz.questions.length + 1;

    quiz.questions.push({
      question: question.value,
      id: index,
      rightAnswerID: state.rightAnswerID,
      answers: [
        { text: option_1.value, id: 1 },
        { text: option_2.value, id: 2 },
        { text: option_3.value, id: 3 },
        { text: option_4.value, id: 4 },
      ],
      note: note.value,
    });

    quiz.title = state.title;

    const formControls = createFormControls();

    props.addQuestion(quiz);

    setState({
      rightAnswerID: 1,
      isFormValid: false,
      formControls: {
        ...formControls,
        quizTitle: {
          ...formControls.quizTitle,
          value: state.title,
          valid: true,
        },
      },
    });
  };

  const addQuizHandler = () => {
    props.addQuiz();

    setState({
      ...state,
      rightAnswerID: 1,
      isFormValid: false,
      formControls: createFormControls(),
      title: "",
    });
  };

  return (
    <div className={classes.QuizCreator}>
      <div>
        <h1>Quiz Creator</h1>

        <form onSubmit={(event) => event.preventDefault()}>
          {renderFormControls()}

          <Select
            label="Select the right answer"
            value={state.rightAnswerID}
            options={[
              { text: 1, value: 1 },
              { text: 2, value: 2 },
              { text: 3, value: 3 },
              { text: 4, value: 4 },
            ]}
            onChange={(event) => selectChangeHandler(event.target.value)}
          />

          <Button
            onClick={addQuestionHandler}
            disabled={!state.isFormValid}
            state="primary"
          >
            Add question
          </Button>
          <Button
            onClick={addQuizHandler}
            disabled={props.quiz.questions.length === 0}
            state="success"
          >
            Create quiz
          </Button>
        </form>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  quiz: state.createQuiz.quiz,
});

const mapDispatchToProps = (dispatch) => ({
  addQuestion: (quiz) => dispatch(addQuestion(quiz)),
  addQuiz: () => dispatch(addQuiz()),
});

export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator);
