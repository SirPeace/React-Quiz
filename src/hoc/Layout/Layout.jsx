import React, { Component } from "react";
import classes from "./Layout.module.scss";
import MenuToggle from "../../components/Navigation/MenuToggle/MenuToggle";
import Drawer from "../../components/Navigation/Drawer/Drawer";
import Backdrop from "../../components/UI/Backdrop/Backdrop";

class Layout extends Component {
  state = {
    menu: false,
  };

  toggleMenuHandler = () => {
    this.setState((prevState) => ({ menu: !prevState.menu }));
  };

  backdropClickHandler = () => {
    this.setState({ menu: false });
  };

  render() {
    return (
      <div className={classes.Layout}>
        <Drawer isOpen={this.state.menu} onToggle={this.toggleMenuHandler} />

        <MenuToggle
          onToggle={this.toggleMenuHandler}
          isOpen={this.state.menu}
        />

        {this.state.menu ? (
          <Backdrop showBackdrop={this.backdropClickHandler} />
        ) : null}

        <main>{this.props.children}</main>
      </div>
    );
  }
}

export default Layout;
