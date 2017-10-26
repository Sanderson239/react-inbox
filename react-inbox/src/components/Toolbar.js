import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchMessages, toggleProperty, toggleSelected, changeLabel, deleteMessage } from '../actions';

class Toolbar extends Component {

  renderCompose(e) {
    e.preventDefault();
    if (this.props.location.pathname==='/') {
      this.props.history.push('/compose')
    } else {
      this.props.history.push('/')
    }
  }



render() {

  const { messageIds, messagesById } = this.props;
  let totalMessageCount = messageIds.length;
  let selectedMessageCount = 0
  let allMessagesSelected = true;
  let unreadMessagesCount = 0;
  for (let key in messagesById) {
    !messagesById[key].selected ? allMessagesSelected = false : selectedMessageCount ++;
    if (!messagesById[key].read) unreadMessagesCount ++;
  }
  let btnStatus = 'fa-square-o'
  if (selectedMessageCount === messageIds.length) btnStatus = 'fa-check-square-o';
  if (selectedMessageCount > 0 && selectedMessageCount < messageIds.length) btnStatus = 'fa-minus-square-o';



    return (
      <div className="row toolbar">
        <div className="col-md-12">
          <p className="pull-right">
            <span className="badge badge">{unreadMessagesCount}</span>
            unread messages
          </p>


          <nav>
          <Link to={{pathname: '/compose'}}>
          <a className="btn btn-danger" onClick={(event) => {this.renderCompose(event)}}>
            <i className="fa fa-plus"></i>
          </a>
          </Link>
          </nav>

          <button className="btn btn-default"   onClick={() => {
            messageIds.forEach(id => {
            this.props.toggleSelected(id, allMessagesSelected)
            })
          }}>
            <i className={`fa ${btnStatus}`}></i>
          </button>

          <button className="btn btn-default" onClick={() => {
            messageIds.forEach(id => {
            if (messagesById[id].selected) this.props.toggleProperty(id, 'read', 'PATCH', 'read', false)
            })
          }}>
            Mark As Read
          </button>

          <button className="btn btn-default" onClick={() => {
            messageIds.forEach(id => {
            if (messagesById[id].selected) this.props.toggleProperty(id, 'read', 'PATCH', 'read', true)
            })
          }}>
            Mark As Unread
          </button>

          <select className="form-control label-select" onChange={(e) => {
            messageIds.forEach(id => {
            if (messagesById[id].selected) this.props.changeLabel(id, 'addLabel' , e.target.value, messagesById[id].labels)
            })
          }}>
            <option>Apply label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <select className="form-control label-select" onChange={(e) => {
            messageIds.forEach(id => {
            if (messagesById[id].selected) this.props.changeLabel(id, 'removeLabel' , e.target.value, messagesById[id].labels)
            })
          }}>
            <option>Remove label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <button className="btn btn-default" onClick={() => {
            messageIds.forEach(id => {
            if (messagesById[id].selected) this.props.deleteMessage(id)
            })
          }}>
            <i className="fa fa-trash-o"></i>
          </button>
        </div>
      </div>    );
  }

}

const mapStateToProps = state => {
  const messageIds = state.messages.ids
  const messagesById = state.messages.messagesById;
  return {
    messageIds,
    messagesById,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchMessages,
  toggleProperty,
  toggleSelected,
  changeLabel,
  deleteMessage
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Toolbar)
