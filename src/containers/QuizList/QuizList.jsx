import React from "react";
import { NavLink } from "react-router-dom";
import Loader from "../../components/UI/Loader/Loader";
import classes from "./QuizList.module.scss";
import { connect } from "react-redux";
import { fetchQuizes } from "../../store/actions/quiz";

function QuizList(props) {
  const fetchQuizes = props.fetchQuizes;

  React.useEffect(() => {
    fetchQuizes();
  }, [fetchQuizes]);

  const renderQuizList = () => {
    return Object.entries(props.quizes).map(([link, quiz], index) => (
      <li key={index}>
        <NavLink to={`/quiz/${link}`}>{quiz.title}</NavLink>
      </li>
    ));
  };

  return (
    <div className={classes.QuizList}>
      <div>
        <h1>Quiz List</h1>

        {props.isLoaded && props.quizes !== 0 ? (
          <ul>{renderQuizList()}</ul>
        ) : (
          <Loader />
        )}

        {props.error ? (
          <p style={{ color: "black" }}>
            Something bad happened on the server: <br />
            <b>{props.error}</b>
          </p>
        ) : null}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  quizes: state.quiz.quizes,
  isLoaded: state.quiz.isLoaded,
  error: state.quiz.error,
});

const mapDispatchToProps = (dispatch) => ({
  fetchQuizes: () => dispatch(fetchQuizes()),
});

export default connect(mapStateToProps, mapDispatchToProps)(QuizList);
