import React, {Component} from 'react';
import {PageHeader, Grid, Col} from 'react-bootstrap';
import {getTodo} from '../services/users/Todo';

export default class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: []
    };
  }

  componentWillMount() {
    var self = this;
    // console.log("hello")
    getTodo().then(function (response) {
      console.log(response)
      if (response.status === 200) {
        self.setState({todos: response.data.data.todos})
      }
    });
  }

  render() {
    const {todos} = this.state;
    return (
      <div>
        <Grid>
          <Col xs={12}>
            <PageHeader>
              <label>Todo</label>
            </PageHeader>
          </Col>
          <Col xs={12} sm={8}>
            {todos.map(todo =>
            <Col xs={12} key={todo.id}>
              <h3>{todo.title}</h3>
            </Col>)}
          </Col>
        </Grid>
      </div>
    )
  }
}
