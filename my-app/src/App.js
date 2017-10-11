import React, { Component } from 'react';
import {Button, Table, Row, Col, Input} from 'react-materialize'

import projectService from './services/project';

import NavbarComponent from './components/Navbar';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      newName: ''
    };

    projectService.get()
      .then(data => {
        this.setState({data: data.projects, loading: false})
      });

    this.onChange = this.onChange.bind(this);
    this.onAdd = this.onAdd.bind(this);
  }

  renderLoading() {
    return <div>Loading...</div>;
  }

  onChange(e) {
    this.setState({newName: e.target.value})
  }

  onAdd() {
    console.log(this.state);
    projectService.post(this.state.newName)
      .then(data => {
        let updatedData = this.state.data;
        updatedData.push({id:+new Date(), name: this.state.newName});
        this.setState({data: updatedData, newName: ''});
      })
      .catch(e => {
        console.log(e);
      });
  }

  renderBody() {
    return (
      <div>
      <NavbarComponent/>
      <Row>
        <Table>
          <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
          </tr>
          </thead>
          <tbody>
          {this.state.data.map(row => {
            return (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.name}</td>
              </tr>
            )
          })}
          </tbody>
        </Table>
      </Row>
        <Row>
          <Input label="Name" onChange={this.onChange} value={this.state.newName} />
          <Col><Button waves='light' onClick={this.onAdd}>Add</Button></Col>

        </Row>
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
