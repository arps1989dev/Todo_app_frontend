import React, {Component} from 'react';
// import {Link} from 'react-router-dom';
import { Col, Button} from 'react-bootstrap';

// import {showTodo} from '../../../services/users/Todo';
// import Item from './Item';
import ItemPopup from './ItemPopup';

import '../../../assets/css/user/todo/todo-details.css';

export default class TodoDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editObject: {},
      itempopup: false,
      showCreatePopup: false,
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

  render() {
    const {todo, todoSlug} = this.state;
    const items = todo.items;
    return (
      <div>
      {this.state.itempopup && (<ItemPopup
        itempopup={this.state.itempopup}
        closeOn={this.closeitempopup}
        renderNewItem={this.renderNewItem}
        todoId={todo.id}/>)}
      <Col xs={12} className="album-details-main-wrap">
        <Col xs={12} className="album-details-outer-wrap p-none">
          <Col xs={12} className="action-wrap">

            <Button
              className="add-photoes-btn btn btn-orange"
              onClick={event => {
              this.setState({itempopup: true});
            }}>
              {/* <img
                  src={require('../../../assets/images/admin/album/album-details/add-icon.png')}
                  alt=""
                />{' '} */}
              Add Item
            </Button>
            <Button
              className="edit-album-detail"
              onClick={() => this.setState({showCreatePopup: true})}>
              <img
                src={require('../../../assets/images/users/todo/edit-icon.png')}
                alt=""/>{' '}
              Edit todo
            </Button>
          </Col>

          <Col xs={12} sm={12} md={8} lg={9} className="photo-selection-wrap">

            {todo.items && todo
              .items
              .map((item, index) => (
                <Col xs={6} sm={4} md={4} lg={3} key={item.id}>
                  <Col xs={12} className="album-photo-thumbs p-none">
                    {item.name}

                  </Col>
                  
                </Col>
              ))}
          </Col>
        </Col>
      </Col>
    </div>
    );
  }

}