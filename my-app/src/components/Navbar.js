import React, {Component} from 'react';
import {Navbar} from 'react-materialize';

export default class NavbarComponent extends Component {
  render() {
    return (
      <Navbar className="teal lighten-2 nav-shift" brand='POC' right>
        {this.props.children}
      </Navbar>);
  }
}
