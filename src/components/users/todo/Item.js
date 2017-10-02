// import React, {Component} from 'react';
// import {Col, Table, Button} from 'react-bootstrap';
// import SweetAlert from 'sweetalert-react';
// import ItemPopup from './ItemPopup';

// import {getItem, deleteItem} from '../../../services/users/Item';

// import {isObjectEmpty} from '../../Helper';

// import '../../../assets/css/user/item/item.css';

// export default class Todo extends Component {

//   constructor(props) {
//     super(props);
//     this.state = {
//       editObject: {},
//       open: false,
//       CreateShow: false,
//       items: [],
//       todoId: this.props.todoId,
//       alert: {
//         show: false,
//         cancelBtn: true,
//         confirmAction: () => {},
//         title: '',
//         btnText: '',
//         type: ''
//       }
//     };
//   }

//   componentWillMount(todoId) {
//     var self = this;
//     getItem(self.state.todoId)
//     .then(function (response) {
//       self.setState({todoId: todoId, items: response.data.data.items});
//     })
//       .catch(function (error) {
//         console.log(error.response);
//       });
//   }

//   showDialogueBox(id) {
//     this.setState({
//       alert: {
//         objectId: id,
//         show: true,
//         title: 'Are you sure?',
//         btnText: 'Yes, delete it!',
//         type: 'warning',
//         confirmAction: () => this.deleteItem(id),
//         cancelBtn: true
//       }
//     });
//   }

//   deleteItem(id) {
//     var self = this;

//     deleteItem(self.state.alert.todoId, id).then(function (response) {
//       if (response.status === 200) {
//         self.handleDeleteSuccessResponse(response, id);
//       } else {
//         self.handleDeleteErrorResponse(response);
//         }
//       })
//       .catch(function (error) {
//         self.handleDeleteErrorResponse(error.response);
//       });
//   }

//   handleDeleteSuccessResponse(response, id) {
//     var self = this;
//     const items = self
//       .state
//       .items
//       .filter(item => item.id !== id);

//     self.setState({
//       items: items,
//       alert: {
//         show: true,
//         title: 'Success',
//         text: response.data.message,
//         type: 'success',
//         confirmAction: () => self.hideDialogueBox()
//       }
//     });
//   }

//   handleDeleteErrorResponse(response) {
//     var self = this;

//     self.setState({
//       alert: {
//         show: true,
//         title: response.data.message,
//         text: response.data.errors[0].detail,
//         type: 'warning',
//         confirmAction: () => self.hideDialogueBox()
//       }
//     });
//   }

//   getStatusClass(done) {
//     if (done === 'false') {
//       return 'text-red';
//     } else {
//       return 'text-green';
//     }
//   }

//   hideDialogueBox() {
//     this.setState({
//       alert: {
//         show: false
//       }
//     });
//   }

//   renderItem = (item, action, id) => {
//     const newitems = this
//       .state
//       .items
//       .slice();

//     if (action === 'insert') {
//       newitems.splice(0, 0, item, id);
//     } else if (action === 'replace' && !isObjectEmpty(this.state.editObject)) {
//       newitems.splice(newitems.indexOf(this.state.editObject), 1, item);
//     }

//     this.setState({items: newitems});
//   };

//   renderUpdateItem = item => {};

//   CreateClose = () => this.setState({CreateShow: false, editObject: {}});

//   handleSelect(eventKey, e) {
//     this.setState({activePage: eventKey});
//   }

//   render() {
//     const {items, alert} = this.state;
//     return (
//       <Col xs={12} className="categories-page-wrap">
//         <SweetAlert
//           show={alert.show || false}
//           title={alert.title || ''}
//           type={alert.type || 'success'}
//           showCancelButton={alert.cancelBtn}
//           confirmButtonText={alert.btnText}
//           onConfirm={alert.confirmAction}
//           onCancel={() => this.hideDialogueBox()}
//         /> 
//         {this.state.CreateShow && (
//           <ItemPopup
//           showCreate={this.state.CreateShow}
//           closeOn={this.CreateClose}
//           editObject={this.state.editObject}
//           renderItem={this.renderItem}
//           />
//         )}
//         <Col xs={12} className="filter-wrap p-none">
//           <Col xs={12} className="p-none">
//             <Button
//               className="btn pull-right btn-orange add-new-btn"
//               onClick={() => this.setState({CreateShow: true})}>
//               <i className="add-icon">
//                 {/* <img src={require('../../../assets/images/admin/album/add-icon.png')} alt=""/>        */}
//               </i>Add New
//             </Button>
//           </Col>
//         </Col>
//         <Col xs={12} className="p-none">
//           <div className="categories-table-wrap">
//             <Table responsive className="categories-table">
//               <thead>
//                 <tr>
//                   <th>Name</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {items.map(item => (
//                   <tr key={item.id}>
//                     <td>{item.name}</td>
//                     <td>
//                       <a
//                         className="edit-icon "
//                         onClick={() => this.setState({CreateShow: true, editObject: item})}>
//                         <img src={require('../../../assets/images/users/item/edit-icon.png')} alt=""/>
//                       </a>
//                       {/* <img
//                         className="seprator"
//                         src={require('../../../assets/images/users/item/seprator.png')}
//                         alt=""
//                       /> */}
//                       <a className="del_butn" onClick={event => this.showDialogueBox(item.id)}>
//                         <img src={require('../../../assets/images/users/item/delete-icon.png')} alt=""/>
//                       </a>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </Table>
//           </div>
//         </Col>

//       </Col>
//     );
//   }

// }