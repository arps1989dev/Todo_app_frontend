import React, {Component} from 'react';
import {Col, Button, Media} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import SweetAlert from 'sweetalert-react';
// import PropTypes from 'prop-types';

import {getTodo, deleteTodo} from '../../../services/users/Todo';
import TodoPopup from './TodoPopup';
// import TodoDetails from './TodoDetails';

import { isObjectEmpty } from '../../Helper';

import '../../../assets/css/user/todo/todo.css';

export default class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editObject: {},
      open: false,
      CreateShow: false,
      todos: [],
      alert: {
        objectId: '',
        show: false,
        cancelBtn: true,
        confirmAction: () => {},
        title: '',
        btnText: '',
        type: ''
      }
    };
  }

  componentWillMount() {
    var self = this;

    getTodo().then(function (response) {
      console.log(response)
      if (response.status === 200) {
        self.setState({todos: response.data.data.todos})
      }
    });
  }

  showDialogueBox(id) {
    // debugger
    this.setState({
      alert: {
        objectId: id,
        show: true,
        title: 'Are you sure?',
        btnText: 'Yes, delete it!',
        type: 'warning',
        confirmAction: () => this.deleteTodo(),
        cancelBtn: true
      }
    });
  }

  deleteTodo() {
    var self = this;
    console.log(self)
    deleteTodo(self.state.alert.objectId)
      .then(function(response){
        if(response.status === 200){
          self.handleDeleteSuccessResponse(response)
        } else {
          self.handleDeleteErrorResponse(response)
        }
      })
      .catch(function(error) {
        self.handleDeleteErrorResponse(error.response);
      });
  }
  

  handleDeleteSuccessResponse(response) {
    var self = this;
    const todos = self.state.todos.filter(
      todo => todo.id !== self.state.alert.objectId
    );

    self.setState({
      todos: todos,

      alert: {
        show: true,
        title: 'Success',
        text: response.data.message,
        type: 'success',
        confirmAction: () => self.hideDialogueBox()
      }
    });
  }

  handleDeleteErrorResponse(response) {
    var self = this;
    self.setState({
      alert: {
        show: true,
        title: response.data.message,
        text: response.data.errors[0].detail,
        type: 'warning',
        confirmAction: () => self.hideDialogueBox()
      }
    });
  }

  hideDialogueBox() {
    this.setState({ alert: { show: false } });
  }

  renderTodo = (todo, action) => {
    const newtodos = this.state.todos.slice();

    if (action === 'insert') {
      newtodos.splice(0, 0, todo);
    } else if (action === 'replace' && !isObjectEmpty(this.state.editObject)) {
      newtodos.splice(newtodos.indexOf(this.state.editObject), 1, todo);
    }

    this.setState({
      todos: newtodos
    });
  };

  CreateClose = () => this.setState({ CreateShow: false, editObject: {} });

  render() {
    const {todos, alert} = this.state;
    return (
      <Col xs={12} className="contacts-page-wrap">
        <SweetAlert
          show={alert.show || false}
          title={alert.title || ''}
          type={alert.type || 'success'}
          showCancelButton={alert.cancelBtn}
          confirmButtonText={alert.btnText}
          onConfirm={alert.confirmAction}
          onCancel={() => this.hideDialogueBox()}
        />
        {this.state.CreateShow &&
         <TodoPopup
          showCreate={this.state.CreateShow}
          closeOn={this.CreateClose}
          editObject={this.state.editObject}
          renderTodo={this.renderTodo}
        />}
        

        <Col xs={12} className="filter-wrap p-none">
          <Button
            className="pull-right btn btn-orange add-new-btn"
            onClick={() => this.setState({CreateShow: true})}>
            Add New
          </Button>
        </Col>
        {todos.map(todo => 
        <div className="contact-list-wrap" key={todo.id}>
          <Col xs={12} className="p-none contact-list">
            {/*alphabet wise block*/}
            <span className="contact-char"></span>
            {/*alphabet wise block*/}
            <Col xs={12} className="contact-list-wrap p-none">
              <Col xs={12} className="contact-wrap">
                <Media className="single-contact">
                  <Media.Body className="contact-detail-wrap">
                    <Media.Heading className="contact-name">
                    <Link to={'/todos/' + todo.slug}>
                      {todo.title}
                    </Link>
                    </Media.Heading>
                    <div className="contact-detail"></div>
                    <div className="action-wrapper">
                      <Button
                        className="btn-link p-none contact-action-btn contact-edit-btn"
                        onClick={() => this.setState({CreateShow: true, editObject: todo})}>
                        <img src={require('../../../assets/images/users/todo/edit-icon.png')} alt=""/>
                      </Button>
                      <Button
                        className="btn-link p-none contact-action-btn contact-delete-btn"
                        onClick={event => this.showDialogueBox(todo.id)}>
                        <img src={require('../../../assets/images/users/todo/delete-icon.png')} alt=""/>
                      </Button>
                    </div>
                  </Media.Body>
                </Media>

              </Col>
            </Col>
          </Col>
        </div>
        )}

      </Col>
    )
  }
}