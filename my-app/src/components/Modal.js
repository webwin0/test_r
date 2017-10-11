import React, {Component} from 'react';

export default class Modal extends Component {

  componentDidMount() {
    window.$('.modal').modal();
  }

  render() {
    return (
      <div id={this.props.id} className="modal">
        <div className="modal-content">
          <h4>{this.props.header}</h4>
          {this.props.children}
        </div>
        <div className="modal-footer">
          <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat">Cancel</a>
          <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat" onClick={this.props.onSave}>Save</a>
        </div>
      </div>);
  }
}