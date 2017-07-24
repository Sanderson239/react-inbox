import React, { Component } from 'react';

class MessageBody extends Component {

  const


render() {
  return (
    <div className="row message-body">
      <div className="col-xs-11 col-xs-offset-1">
        {this.props.body}
      </div>
    </div>
    );
  }
}

export default MessageBody;
