import React, {Component} from 'react';
// import {Link} from 'react-router-dom';
import {Col, Button} from 'react-bootstrap';
import SweetAlert from 'sweetalert-react';
import {showTodo} from '../../../services/users/Todo';
import {getItem, deleteItem} from '../../../services/users/Item';
// import Item from './Item';
import ItemPopup from './ItemPopup';
import {isObjectEmpty} from '../../Helper';
import '../../../assets/css/user/todo/todo-details.css';

export default class TodoDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editObject: {},
      itempopup: false,
      showCreatePopup: false,
      open: false,
      CreateShow: false,
      items: [],
      todoId: this.props.todoId,
      todoSlug: this.props.match.params.slug,
      todo: props.todo,
      alert: {
        show: false,
        cancelBtn: true,
        confirmAction: () => {},
        title: '',
        text: '',
        btnText: '',
        type: ''
      }
    };
  }

  componentWillMount(todoId) {
    var self = this;
    showTodo(self.state.todoSlug).then(function (response) {
      // console.log(response)
      var data = response.data;
      if (response.status === 200) {
        console.log(response.data.data.todo)
        self.setState({todo: data.data.todo});
        }
      })
      .catch(function (error) {
        console.log(error.response);
      });

      // debugger
    getItem(self.state.todoId)
    .then(function (response) {
      self.setState({todoId: todoId, items: response.data.data.items});
    })
    .catch(function (error) {
      console.log(error.response);
    });
  }


  showDialogueBox(id) {
    this.setState({
      alert: {
        objectId: id,
        show: true,
        title: 'Are you sure?',
        btnText: 'Yes, delete it!',
        type: 'warning',
        confirmAction: () => this.deleteItem(id),
        cancelBtn: true
      }
    });
  }

  deleteItem(id) {
    var self = this;

    deleteItem(self.state.alert.todoId, id).then(function (response) {
      if (response.status === 200) {
        self.handleDeleteSuccessResponse(response, id);
      } else {
        self.handleDeleteErrorResponse(response);
        }
      })
      .catch(function (error) {
        self.handleDeleteErrorResponse(error.response);
      });
  }

  handleDeleteSuccessResponse(response, id) {
    var self = this;
    const items = self
      .state
      .items
      .filter(item => item.id !== id);

    self.setState({
      items: items,
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

  getStatusClass(done) {
    if (done === 'false') {
      return 'text-red';
    } else {
      return 'text-green';
    }
  }

  hideDialogueBox() {
    this.setState({
      alert: {
        show: false
      }
    });
  }

  renderItem = (item, action, id) => {
    const newitems = this
      .state
      .items
      .slice();

    if (action === 'insert') {
      newitems.splice(0, 0, item, id);
    } else if (action === 'replace' && !isObjectEmpty(this.state.editObject)) {
      newitems.splice(newitems.indexOf(this.state.editObject), 1, item);
    }

    this.setState({items: newitems});
  };

  renderUpdateItem = item => {};

  CreateClose = () => this.setState({CreateShow: false, editObject: {}});

  handleSelect(eventKey, e) {
    this.setState({activePage: eventKey});
  }

  render() {
    const {todo, alert} = this.state;
    // const items = todo.items;
    return (
      <div>
        <SweetAlert
          show={alert.show || false}
          title={alert.title || ''}
          type={alert.type || 'success'}
          showCancelButton={alert.cancelBtn}
          confirmButtonText={alert.btnText}
          onConfirm={alert.confirmAction}
          onCancel={() => this.hideDialogueBox()}
        /> 
        {this.state.CreateShow && (
          <ItemPopup
          showCreate={this.state.CreateShow}
          closeOn={this.CreateClose}
          editObject={this.state.editObject}
          renderItem={this.renderItem}
          />
        )}
        <Col xs={12} className="album-details-main-wrap">
          <Col xs={12} className="album-details-outer-wrap p-none">
            <Col xs={12} className="action-wrap">
              <strong>TODO Details</strong>
              <Button
                className="add-photoes-btn btn btn-orange"
                onClick={() => this.setState({CreateShow: true})}>
                Add Item
              </Button>
              <Button
                className="edit-album-detail"
                onClick={() => this.setState({showCreatePopup: true})}>
                <img src={require('../../../assets/images/users/todo/edit-icon.png')} alt=""/>{' '}

              </Button>
            </Col>

            <Col xs={12} sm={12} md={8} lg={9} className="photo-selection-wrap">

              {/* {todo.items && todo
              .items
              .map((item, index) => (
                <Col xs={6} sm={4} md={4} lg={3} key={item.id}>
                  <Col xs={12} className="album-photo-thumbs p-none">
                    {item.name}

                  </Col>

                </Col>
              ))} */}
            </Col>
          </Col>
        </Col>
      </div>
    );
  }

}