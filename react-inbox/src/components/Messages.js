import React, { Component } from 'react';
import Message from './Message';
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { fetchMessages } from '../actions'
import { bindActionCreators } from 'redux'


class Messages extends Component {

  componentDidMount() {
  this.props.fetchMessages();
}



  render() {

    const { messageIds } = this.props;
    console.log(this.props);
    return (
      <div>
      { messageIds.map(messageId => <Message key={ messageId } messageId={ messageId } location={ this.props.location } history={ this.props.history } />) }
      </div>
    );
  }
}


const mapStateToProps = state => {
  const messageIds = state.messages.ids
  const messagesById = state.messages.messagesById;
  return {
    messageIds,
    messagesById
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchMessages
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Messages)
