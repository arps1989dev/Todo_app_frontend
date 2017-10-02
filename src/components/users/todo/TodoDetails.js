import React, {Component} from 'react';
// import {Link} from 'react-router-dom';
import {Col, Button, Table} from 'react-bootstrap';
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
      itemObject:{},
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
  
  componentWillMount() {
    var self = this;
    console.log(self.state.todoSlug , "hiii" )
    
    showTodo(self.state.todoSlug).then(function (response) {
      console.log(response , "show TODO")
      var data = response.data;
      if (response.status === 200) {
        console.log(response.data.data.todo)
        self.setState({todo: data.data.todo});
      }
    })
    .catch(function (error) {
      console.log(error.response);
    });
    
    getItem(self.state.todoSlug)
    .then(function (response) {      
      console.log(response , "response getItem" )
        self.setState({todoSlug: self.state.todoSlug, items: response.data.data.items});
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
    debugger
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
    const {alert, items} = this.state;
    
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
          itemObject={this.state.itemObject}
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
            </Col>            
            <Col xs={12} className="p-none">
              <div className="categories-table-wrap">
                <Table responsive className="categories-table">
                  <thead>
                    <tr>
                      <th>Items Name</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                  {items.map((item, index) => (
                      <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>
                          <a
                            className="edit-icon"
                            onClick={() =>
                              this.setState({
                                CreateShow: true,
                                editObject: item
                              })}
                          >
                          <img src={require('../../../assets/images/users/todo/edit-icon.png')} alt=""/>
                          </a>
                          {/* <img
                            className="seprator"
                            src={require('../../../assets/images/admin/category/seprator.png')}
                            alt=""
                          />
                          <a
                            className="del_butn"
                            onClick={event => this.showDialogueBox(category.id)}
                          >
                            <img
                              src={require('../../../assets/images/admin/category/delete-icon.png')}
                              alt=""
                            />
                          </a> */}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Col>
          </Col>
        </Col>
      </div>
    );
  }

}