import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {Navbar, Nav, NavItem} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

import {LogoutService} from '../services/users/Auth';
import {currentUser} from './Helper';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      redirectToReferrer: false
    };
  }

  handleLogout(event) {
    var self = this;
    LogoutService({
        user_id: currentUser().id
      }).then(function (response) {
      self.handleResponse(response);
    });
  }

  handleResponse(response) {
    if (response.status === 200) {
      localStorage.clear();
      this.setState({redirectToReferrer: true});
    }
  }

  render() {
    if (this.state.redirectToReferrer) {
      return <Redirect push to="/"/>;
    }

    return (
      <Navbar inverse>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">TODO APP
            </Link>
          </Navbar.Brand>
        </Navbar.Header>

        <Navbar.Toggle/>
        <Navbar.Collapse>

          <Nav>
            <LinkContainer to="/Todo">
              <NavItem eventKey={4}>Todo</NavItem>
            </LinkContainer>

            <NavItem eventKey={2} href="#">Item</NavItem>
          </Nav>
          <Nav pullRight>
            <NavItem eventKey={1} href="#">Login</NavItem>
            <NavItem eventKey={2} href="#"></NavItem>
            <NavItem onClick={event => this.handleLogout(event)}>
              Logout
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
