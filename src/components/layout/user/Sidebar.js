import React, { Component } from 'react';
// import { NavLink } from 'react-router-dom';
// import { Col, ListGroup, ListGroupItem } from 'react-bootstrap';
import {Nav, NavItem, Navbar} from 'react-bootstrap';


// Import services
// import { getCurrentUser } from '../../../services/admin/User';

import styles from '../../../assets/css/user/sidebar.css';

export default class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }

  componentWillMount() {
    var self = this;

    // getCurrentUser()
    //   .then(function(response) {
    //     if (response.status === 200) {
    //       self.setState({ user: response.data.data.user });
    //     } else {
    //       console.log(response.data);
    //     }
    //   })
    //   .catch(function(error) {
    //     console.log(error.response);
    //   });
  }

  render() {
    const { user } = this.state;
    

      return(
        <div id="sidebar-menu" className={styles.sideBarMenuContainer}>
          <Navbar fluid className={styles.sidebar} inverse >

              <Navbar.Header>
                  <Navbar.Brand>
                      <a href="/">User Name</a>
                  </Navbar.Brand>
                  <Navbar.Toggle />
              </Navbar.Header>

              <Navbar.Collapse>
                 
                  <Nav>
                      
                      <NavItem eventKey={2}>Item 2</NavItem>
                      <NavItem eventKey={3}>Item 3</NavItem>
                  </Nav>
              </Navbar.Collapse>

          </Navbar>
      </div>
    );
  }
}
