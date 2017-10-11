import React, {Component} from 'react';
import {Navbar, NavItem} from 'react-materialize';

export default class NavbarComponent extends Component {
  render() {
    return (
      <Navbar brand='logo' right>
        <NavItem href='components.html'>Login</NavItem>
      </Navbar>);
  }
}