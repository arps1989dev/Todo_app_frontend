import React, { Component } from 'react';
import {
  Col,
  Button,
  Modal,
  ControlLabel,
  FormGroup,
  FormControl
} from 'react-bootstrap';
import { createTodo, updateTodo } from '../../../services/users/Todo';
import '../../../assets/css/user/todo/todo_popup.css';
import { str2bool, isObjectEmpty } from '../../Helper';

export default class TodoPopup extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }


  getInitialState() {
    const initialState = {
      todoForm: {
        title: ''
      }
    };

    return initialState;
  }

  editContact(todo) {
    var self = this;
    const { title } = todo;
    self.setState({
      todoForm: {
        title: title
      }
    });
  }

  componentWillMount() {
    var self = this;

    if (!isObjectEmpty(self.props.editObject)) {
      self.editContact(self.props.editObject);
    }
  }

  handleChange(e) {
    const todoForm = this.state.todoForm;
    console.log(todoForm)
    var key = e.target.name;
    todoForm[key] = str2bool(e.target.value);
    this.setState({
      todoForm
    });
  }

  handleSubmit(e) {
    var self = this;
    let data = (this.state.todoForm);
    var callTodoApi = () => {};
    if (isObjectEmpty(self.props.editObject)) {
      var createParams = data;
      callTodoApi = createTodo(createParams);
    } else {
      var editParams = {
        id: self.props.editObject.id,
        todoForm: data
      };
      callTodoApi = updateTodo(editParams);
    }

    callTodoApi
      .then(function(response) {
        self.handelResponse(response);
      })
      .catch(function(error) {
        console.log(error.response);
      });
  }

  handelResponse(response) {
    var responseData = response.data;
    if (response.status === 201) {
      this.resettodoForm();
      this.props.renderTodo(
        responseData.data.todo,
        isObjectEmpty(this.props.editObject) ? 'insert' : 'replace'
      );
      this.props.closeOn();
    } else {
      console.log(responseData.errors);
    }
  }

  resettodoForm() {
    this.setState({ todoForm: this.getInitialState().todoForm });
  }

  render() {
    const { todoForm } = this.state;
    return(
      <Modal
        show={this.props.showCreate}
        className="add-contact-modal"
        aria-labelledby="contained-modal-title-lg"
      >
      <Modal.Body className="add-contact-body p-none">
          <span className="close-modal-icon" onClick={this.props.closeOn}>
            <img
              src={require('../../../assets/images/users/todo/close-icon.png')}
              alt=""
              className="hidden-xs"
            />
            <img
              src={require('../../../assets/images/users/todo/close-icon-white.png')}
              alt=""
              className="visible-xs"
            />
          </span>
          <Col className="add-contact-title-wrap p-none" sm={5}>
            <Col xs={12} className="p-none add-contact-title-details">
              
              <h4 className="add-contact-text text-white">
                {/*Create New Contact*/}
                {isObjectEmpty(this.props.editObject)
                  ? 'Create New Todo'
                  : 'Edit Todo'}
              </h4>
            </Col>
          </Col>
          <Col className="add-contact-wrap" sm={7}>
            <form className="add-contact-form custom-form">
              <FormGroup className="custom-form-group required">
                <ControlLabel className="custom-form-control-label">
                  Title
                </ControlLabel>
                <FormControl
                  className="custom-form-control"
                  type="text"
                  placeholder="title"
                  name="title"
                  value={todoForm.title}
                  onChange={this.handleChange.bind(this)}
                />
              </FormGroup>

              <Button
                className="btn btn-orange add-contact-submit"
                onClick={event => this.handleSubmit(event)}
              >
                Save
              </Button>
              <Button
                type="button"
                onClick={this.props.closeOn}
                className="btn btn-grey add-contact-cancel"
              >
                Cancel
              </Button>
            </form>
          </Col>
        </Modal.Body>
      </Modal>
    );
  }


}