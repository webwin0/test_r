import React, { Component } from 'react';
import {Button, Icon, Table} from 'react-materialize'
import projectService from './services/project';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true
    };

    projectService.get()
      .then(data => {
        console.log('data=', data);
        this.setState({data: data.projects, loading: false})
      })
  }

  renderLoading() {
    return <div>Loading...</div>;
  }

  renderBody() {
    console.log('this.state=', this.state);

    return (
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
            <tr>
              <td>{row.id}</td>
              <td>{row.name}</td>
            </tr>
          )
        })}
        </tbody>
      </Table>
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
