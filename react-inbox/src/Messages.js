import React, { Component } from 'react';
import Message from './Message';


class Messages extends Component {



  render() {
    return (
      <div>
      {
        this.props.messages.map(message => {
        return <Message id={message.id} subject={message.subject} read={message.read} starred={message.starred} selected={message.selected} labels={message.labels} toggleProperty={this.props.toggleProperty} readEmail={this.props.readEmail} />
        })
      }
      </div>
    );
  }


}

export default Messages;
