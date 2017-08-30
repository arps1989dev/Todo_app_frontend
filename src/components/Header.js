import React, { Component } from 'react';
import { Navbar, Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

import { LogoutService } from '../services/users/Auth';

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
      LogoutService({id: '' }).then(function(response) {
        self.handleResponse(response);
      });
    }
  
    handleResponse(response) {
      if (response.status === 200) {
        localStorage.clear();
        this.setState({ redirectToReferrer: true });
      }
    }
  
    render() {
      if (this.state.redirectToReferrer) {
        return <Redirect push to="/admin" />;
      }
  
      return (

       <div>
           helo
       </div>
      );
    }
  }
  