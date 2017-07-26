import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchMessageBody } from '../actions'


class MessageBody extends Component {

  componentDidMount() {
    this.props.fetchMessageBody(this.props.id);
  }

  render() {


    return (
      <div className="row message-body">
        <div className="col-xs-11 col-xs-offset-1">
        {this.props.messages.messagesById[this.props.id].body}
        </div>
      </div>
      );
    }
  }

  const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchMessageBody
    },
    dispatch,
  );

  const mapStateToProps = (state) => {
    const messages = state.messages;
    const messageById = state.messagesById;
    return {
      messages,
      messageById
    };
  };



  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(MessageBody)
