import React, { Component } from 'react';
import {
  Col,
  Button,
  Modal,
  ControlLabel,
  FormGroup,
  FormControl
} from 'react-bootstrap';
import { createItem, updateItem } from '../../../services/users/Item';
import { isObjectEmpty } from '../../Helper';
import '../../../assets/css/user/item/item_popup.css';

export default class ItemPopup extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }


  getInitialState() {
    const initialState = {
      itemForm: {
        name: ''
      },
      errors: {}
    };

    return initialState;
  }

  handleChange(e) {
    const itemForm = this.state.itemForm;
    var key = e.target.name;
    itemForm[key] = e.target.value;
    this.setState({
      itemForm
    });
  }

  handleSubmit(e) {      
    var self = this;
    var callItemApi = () => {};
    if (isObjectEmpty(self.props.editObject)) {
      var createParams = { 
        todoId: self.props.itemObject.todo.id,
        item: self.state.itemForm 
      };
      callItemApi = createItem(createParams);
    } else {
      var editParams = {
        todoId: self.props.editObject.todo.slug,
        id: self.props.editObject.id,      
        itemForm: { item: self.state.itemForm }
      };
      callItemApi = updateItem(editParams);
    }

    callItemApi
      .then(function(response) {
        console.log(response)
        self.handelResponse(response);
      })
      .catch(function(error) {
        console.log(error.response);
      });
  }

  handelResponse(response) {
    var responseData = response.data;
    if (response.status === 201) {      
      this.resetitemForm();
      this.props.renderItem(
        responseData.data.item,
        console.log(responseData.data.item, "Res DATA"),
        isObjectEmpty(this.props.editObject) ? 'insert' : 'replace'
      );
      this.props.closeOn();
    } else {      
      console.log(responseData.errors);
    }
  }


  resetitemForm() {
    this.setState({ itemForm: this.getInitialState().itemForm });
  }


  editItem(item) {
    var self = this;
    const { name } = item;
    self.setState({
      itemForm: {
        name: name
      }
    });
  }

  componentWillMount() {
    var self = this;

    if (!isObjectEmpty(self.props.editObject)) {
      self.editItem(self.props.editObject);
    }
  }


  updateState(element) {
    this.setState({ value: element });
  }


  render() {
    const { itemForm } = this.state;
    return(
      <Modal
        show={this.props.showCreate}
        className="add-category-modal" 
        aria-labelledby="contained-modal-title-lg"
      >
        <Modal.Body className="add-category-body p-none">
          <span
            className="close-modal-icon"
            onClick={this.props.closeOn}
          >
            <img
              src={require('../../../assets/images/users/item/close-icon.png')}
              alt=""
            />
          </span>
          <Col className="add-title-wrap p-none" sm={5}>
            <Col xs={12} className="p-none add-category-title-details">
             
              <h4 className="add-category-text text-white">
                {isObjectEmpty(this.props.editObject) ? (
                  'Create new item'
                ) : (
                  'Edit item'
                )}
              </h4>
            </Col>
          </Col>
          <Col className="add-content-wrap" sm={7}>
            <form className="create-album-form custom-form">
              <FormGroup className="custom-form-group required">
                <ControlLabel className="custom-form-control-label">
                  name
                </ControlLabel>
                <FormControl
                  className="custom-form-control"
                  type="text"
                  name="name"
                  value={itemForm.name}
                  onChange={this.handleChange.bind(this)}
                />
              </FormGroup>

              <Button
                className="btn btn-orange add-category-submit"
                onClick={event => this.handleSubmit(event)}
              >
                Save
              </Button>
              <Button
                type="button"
                onClick={this.props.closeOn}
                className="btn btn-grey add-category-cancel"
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