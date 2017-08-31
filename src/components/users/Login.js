import React, {Component} from 'react';
import {
  Button,
  FormControl,
  Grid,
  Col,
  Row,
  FormGroup
} from 'react-bootstrap';

import {Redirect} from 'react-router-dom';
import {isLoggedIn} from '../helper';
import {LoginService} from '../../services/users/Auth';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  getInitialState() {
    const initialState = {
      loginForm: {
        email: '',
        password: '',
        grant_type: 'password'
      },
      errors: '',
      redirectToReferrer: false
    };

    return initialState;
  }

  handleChange(e) {
    const loginForm = this.state.loginForm;
    var key = e.target.name;
    loginForm[key] = e.target.value;
    this.setState({loginForm});
  }

  handleSignin(event) {
    var self = this;
		LoginService(self.state.loginForm)
			.then(function (response) {
			console.log(response);
      self.handelResponse(response);
    })
		.catch(function (error) {
			debugger
        // alert(error.response.data.error);
        self.setState({errors: error});
      });
  }

  handelResponse(response) {
    if (response.status === 200) {
      localStorage.setItem('AUTH_TOKEN', response.data.data.token.access_token);
      localStorage.setItem('CURRENT_USER', JSON.stringify(response.data.data.user));
      this.setState({redirectToReferrer: true});
    } else {
      console.log('Invalid email and password');
      alert('Invalid email and password');
    }
  }

  render() {
    if (isLoggedIn() || this.state.redirectToReferrer) {
      return <Redirect push to="/todos"/>;
    }
    return (
      <div className="login-wrap">
        <Grid className="page-inner-wrap">
          <Row>
            <Col xs={10} sm={6} className="login-form">
              <Col xs={12} sm={10} md={8} className="login-details-block">
                <FormGroup className="custom-fromgrp">
                  <FormControl
                    className="login-control"
                    type="email"
                    placeholder="Email"
                    label="email"
                    name="email"
                    onChange={this
                    .handleChange
                    .bind(this)}/>
                  <span className="custom-addon">*</span>
                </FormGroup>
                <FormGroup className="custom-fromgrp">
                  <FormControl
                    className="login-control"
                    type="password"
                    placeholder="Password"
                    label="password"
                    name="password"
                    onChange={this
                    .handleChange
                    .bind(this)}/>
                  <span className="custom-addon">*</span>
                </FormGroup>
              </Col>
              <Button
                className="btn-orange login-btn text-center"
                onClick={event => this.handleSignin(event)}>
                LOGIN
              </Button>
            </Col>
          </Row>
        </Grid>
      </div>

    );
  }
}