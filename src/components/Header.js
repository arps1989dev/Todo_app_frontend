import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Navbar, Nav, NavItem} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      redirectToReferrer: false
    };
  }

  render() {
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
          <Nav pullRight>
            <LinkContainer to="/user">
              <NavItem eventKey={1}>Login</NavItem>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
