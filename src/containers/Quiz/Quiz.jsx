import React, { Component } from "react";
import classes from "./Quiz.module.scss";
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
import Loader from "../../components/UI/Loader/Loader";
import { connect } from "react-redux";
import {
  answerClickHandler,
  fetchQuiz,
  resetQuiz,
} from "../../store/actions/quiz";

class Quiz extends Component {
  componentDidMount() {
    this.props.fetchQuiz(this.props.match.params.name);
  }

  componentWillUnmount() {
    this.props.resetQuiz(this.props);
  }

  render() {
    const displayedComponent = this.props.isQuizLoaded ? (
      this.props.isQuizFinished ? (
        <FinishedQuiz
          results={this.props.results}
          quiz={this.props.quiz}
          resetQuiz={() => this.props.resetQuiz(this.props)}
        />
      ) : (
        <ActiveQuiz
          onAnswerClick={this.props.answerClickHandler}
          questionsCount={this.props.quiz.length}
          questionNumber={this.props.activeQuestion + 1}
          question={this.props.quiz[this.props.activeQuestion].question}
          answers={this.props.quiz[this.props.activeQuestion].answers}
          answerState={this.props.answerState}
        />
      )
    ) : (
      <Loader />
    );

    return (
      <div className={classes.Quiz}>
        <h1>{this.props.title}</h1>

        <div className={classes.ActiveQuizWrapper}>{displayedComponent}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  title: state.quiz.title,
  activeQuestion: state.quiz.activeQuestion,
  answerState: state.quiz.answerState,
  isQuizFinished: state.quiz.isQuizFinished,
  isQuizLoaded: state.quiz.isQuizLoaded,
  results: state.quiz.results,
  quiz: state.quiz.quiz,
});

const mapDispatchToProps = (dispatch) => ({
  fetchQuiz: (id) => dispatch(fetchQuiz(id)),
  answerClickHandler: (id) => dispatch(answerClickHandler(id)),
  resetQuiz: (props) => dispatch(resetQuiz(props)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
