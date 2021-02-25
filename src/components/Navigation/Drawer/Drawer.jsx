import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import classes from "./Drawer.module.scss";

class Drawer extends Component {
  render() {
    let links = [{ to: "/", label: "Quiz List", exact: true }];

    if (this.props.isAuthenticated) {
      links.push(
        { to: "/quiz/create", label: "Create a quiz" },
        { to: "/logout", label: "Sign Out" }
      );
    } else {
      links.push({ to: "/auth", label: "Authorization" });
    }

    const cls = [classes.Drawer];

    if (!this.props.isOpen) cls.push(classes.closed);

    return (
      <div className={cls.join(" ")}>
        <ul>
          {links.map((link, index) => (
            <li key={index}>
              <NavLink to={link.to} onClick={this.props.onToggle}>
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: !!state.auth.token,
});

export default connect(mapStateToProps)(Drawer);
