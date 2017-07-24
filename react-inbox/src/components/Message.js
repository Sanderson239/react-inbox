import React, { Component } from 'react';
import Api from '../utils/Api'
import { bindActionCreators } from "redux";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { toggleProperty, toggleSelected } from '../actions'
import Labels from './Labels';
import MessageBody from './MessageBody';



class Message extends Component {


  // renderMessageBody(e, id) {
  //   e.preventDefault();
  //   if (this.props.location.pathname==='/') {
  //     this.props.history.push(`/messages/${id}`)
  //   } else {
  //     this.props.history.push('/messages')
  //   }
  // }

// let messageBody =  fetch(`http://localhost:8181/api/messages/${id}`)
// .then(response => response.json())
// .then(json => {
//   return json.body;
// })




  // console.log(Api.fetchMessageById(id)
  // .then(body => {
  //   messageBody = body;
  // }));

render() {
  const { body, id, read, starred, selected, labels, subject, toggleProperty, toggleSelected } = this.props
  const messageRead = read ? 'read' : 'unread';
  const messageStarred = starred ? 'fa-star' : 'fa-star-o';
  const messageSelected = selected ? 'selected' : '';
    return (
      <Router>
      <div>
      <div className={`row message ${messageRead} ${messageSelected}`}>
        <div className="col-xs-1">
          <div className="row">
            <div className="col-xs-2">
              <input type="checkbox" checked={ selected } onClick={() => toggleSelected(id, selected)}/>
            </div>
            <div className="col-xs-2">
              <i className={`star fa ${messageStarred}`} onClick={() => toggleProperty(id,'starred', 'PATCH', 'star', starred)}></i>
            </div>
          </div>
        </div>
        <div className="col-xs-11" onClick={(event) => {
            // this.renderMessageBody(event, id)
            toggleProperty(id, 'read', 'PATCH', 'read', false)
          }
        }>
        {labels.map(label => <Labels label={label} key={label} />)}
        <Link to={`/messages/${id}`}>
              {subject}
          </Link>
        </div>
        </div>
        <div>
        <Route exact path={`/messages/${id}`} render={props => <MessageBody body={id} {...props} />} />
      </div>
      </div>
      </Router>




    );
  }
}




const mapStateToProps = (state, ownProps) => {
  const message = state.messages.messagesById[ownProps.messageId]
  const { body, id, read, starred, selected, labels, subject } = message
  return {
    body,
    id,
    read,
    starred,
    labels,
    subject,
    selected
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  toggleProperty,
  toggleSelected,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Message)
