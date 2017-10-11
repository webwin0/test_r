import React, { Component } from 'react';
import {Button, Table, NavItem, Input, Icon} from 'react-materialize'

import projectService from './services/project';
import userService from './services/user';

import NavbarComponent from './components/Navbar';
import Modal from './components/Modal';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      newName: '',
      user: null
    };

    const result = Promise.all([
      projectService.get()
        .then(data => {
          this.setState({data: data.projects})
        })
        .catch(e => {
          console.log(e);
        }),
      userService.get('8aaaa9a2-fbfe-4a1e-901a-d167c6300805')
        .then(data => {
          console.log('userData', data);
          this.setState({user: data})
        })
        .catch(e => {
          console.log(e);
        })]);

    result.then(() => this.setState({loading: false}));

    this.onChange = this.onChange.bind(this);
    this.onChangeEdit = this.onChangeEdit.bind(this);
    this.onAdd = this.onAdd.bind(this);
    this.onEdit = this.onEdit.bind(this);
  }

  renderLoading() {
    return <div>Loading...</div>;
  }

  onChange(e) {
    this.setState({newName: e.target.value})
  }

  onChangeEdit(e) {
    this.setState({currentProjectName: e.target.value})
  }

  onAdd() {
    projectService.post(this.state.newName)
      .then(data => {
        let updatedData = this.state.data;
        updatedData.push({id: data.id, name: data.name});
        this.setState({data: updatedData, newName: ''});
      })
      .catch(e => {
        console.log(e);
      });
  }

  onEdit(e) {
    const {currentProjectId, currentProjectName} = this.state;

    projectService.put({id: currentProjectId, name: currentProjectName})
      .then(data => {
        let updatedData = this.state.data;
        const index = updatedData.findIndex(val => val.id === currentProjectId);
        updatedData[index].name = currentProjectName;
        this.setState({data: updatedData});
      })
      .catch(e => {
        console.log(e);
      });
  }

  setActiveProject(id) {
    let currentProject = this.state.data.filter(row => row.id === id)[0];
    this.setState({currentProjectId: id, currentProjectName: currentProject.name});
  }

  showFullname() {
    return <span><Icon left tiny>face</Icon>{this.state.user.first_name} {this.state.user.last_name}</span>;
  }

  renderBody() {
    return (
      <div>
      <NavbarComponent>
        {this.state.user ? this.showFullname() : <NavItem href='components.html'>Login</NavItem>}
      </NavbarComponent>
        <div className="container">
          <div className="section">
        <Table>
          <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>
              <Modal id="modal_add" header="Create project" onSave={this.onAdd}>
                <Input label="Name" onChange={this.onChange} value={this.state.newName}/>
              </Modal>
              <Modal id="modal_edit" header="Edit project" onSave={this.onEdit}>
                <Input label="Name" onChange={this.onChangeEdit} value={this.state.currentProjectName}/>
              </Modal>
              <Button data-target="modal_add" className="btn modal-trigger" floating small waves="light" icon="add"/>
            </th>
          </tr>
          </thead>
          <tbody>
          {this.state.data.map(row => {
            return (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.name}</td>
                <td><a className="modal-trigger" href="#modal_edit" onClick={() => this.setActiveProject(row.id)}><Icon center tiny>edit</Icon></a> <Icon center tiny>stop</Icon></td>
              </tr>
            )
          })}
          </tbody>
        </Table>
          </div>
          </div>
      </div>
    );
  }

  render() {
    if (this.state.loading) {
      return this.renderLoading();
    } else {
      return this.renderBody();
    }
  }
}

export default App;
