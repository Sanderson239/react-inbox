import React, { Component } from 'react';
import Message from './Message';



class Toolbar extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    // if (this.props.countSelectedMessages(this.props.messages) !== this.props.countSelectedMessages(nextProps)) {
    //   return true
    // }
    if (!this.props.showCompose) {
      return true;
    }
    return false;
  }


render() {

  let unreadMessagesCount = 0;
  for (let msg of this.props.messages) {
       if (!msg.read) {unreadMessagesCount ++};
     }
    return (
      <div className="row toolbar">
        <div className="col-md-12">
          <p className="pull-right">
            <span className="badge badge">{unreadMessagesCount}</span>
            unread messages
          </p>

          <a className="btn btn-danger" onClick={() => this.props.renderCompose()}>
            <i className="fa fa-plus"></i>
          </a>

          <button className="btn btn-default" onClick={this.props.selectAllMessages}>
            <i className="fa fa-check-square-o"></i>
          </button>

          <button className="btn btn-default" onClick={() => {
            this.props.messages.forEach(message => {
            if (message.selected) this.props.readEmail(message, true)
            })
          }}>
            Mark As Read
          </button>

          <button className="btn btn-default" onClick={() => {
            this.props.messages.forEach(message => {
            if (message.selected) this.props.readEmail(message, false)
            })
          }}>
            Mark As Unread
          </button>

          <select className="form-control label-select" onChange={(e) => {
            this.props.messages.forEach(message => {
            if (message.selected) this.props.changeLabel(message, e.target.value, true)
            })
          }}>
            <option>Apply label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <select className="form-control label-select" onChange={(e) => {
            this.props.messages.forEach(message => {
            if (message.selected) this.props.changeLabel(message, e.target.value, false)
            })
          }}>
            <option>Remove label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <button className="btn btn-default">
            <i className="fa fa-trash-o"></i>
          </button>
        </div>
      </div>    );
  }

}

export default Toolbar;
