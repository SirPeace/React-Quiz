import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { logout } from "../../store/actions/auth";

function Logout(props) {
  React.useEffect(() => {
    props.logout();
  });

  return <Redirect to="/" />;
}

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
});

export default connect(null, mapDispatchToProps)(Logout);
