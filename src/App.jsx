import React from "react";
import Layout from "./hoc/Layout/Layout";
import Quiz from "./containers/Quiz/Quiz";
import QuizList from "./containers/QuizList/QuizList";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import Auth from "./containers/Auth/Auth";
import QuizCreator from "./containers/QuizCreator/QuizCreator";
import NotFound from "./containers/NotFound/NotFound";
import { connect } from "react-redux";
import Logout from "./components/Logout/Logout";
import { autoLogin } from "./store/actions/auth";

function App(props) {
  const autoLogin = props.autoLogin;

  React.useEffect(() => {
    autoLogin();
  }, [autoLogin]);

  let routes = (
    <Switch>
      <Route path="/auth" component={Auth} />
      <Route path="/quiz/:name" component={Quiz} />
      <Route path="/" exact component={QuizList} />
      <Route component={NotFound} />
    </Switch>
  );

  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/logout" component={Logout} />
        <Route path="/quiz/create" component={QuizCreator} />
        <Route path="/quiz/:name" component={Quiz} />
        <Route path="/" exact component={QuizList} />
        <Redirect from="/auth" to="/" />
        <Route render={() => NotFound} />
      </Switch>
    );
  }

  return (
    <div className="App">
      <Layout>{routes}</Layout>
    </div>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: !!state.auth.token,
});

const mapDispatchToProps = (dispatch) => ({
  autoLogin: () => dispatch(autoLogin()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
