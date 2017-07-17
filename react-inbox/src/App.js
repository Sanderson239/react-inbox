import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Toolbar from './Toolbar';
import Message from './Message';
import Messages from './Messages'
import Compose from './Compose.js';


class App extends Component {
  constructor(props){
    super(props)

  this.state = {
    data: [],
    apiUrl: 'http://localhost:8181/api/messages',
    showCompose: false
  }

  this.readEmail = this.readEmail.bind(this);
  this.toggleProperty = this.toggleProperty.bind(this);
  this.changeLabel = this.changeLabel.bind(this);
  this.selectAllMessages = this.selectAllMessages.bind(this);
  this.fetchMessages = this.fetchMessages.bind(this);
  this.addMessage = this.addMessage.bind(this);
  this.renderCompose = this.renderCompose.bind(this);


}

renderCompose() {
  this.setState({showCompose: !this.state.showCompose})
}

fetchMessages() {
    fetch(this.state.apiUrl)
      .then(response => response.json())
      .then(response => {
        this.setState(
         {
          data: response._embedded.messages
        })
      })
      .catch(err => err);
}


toggleProperty(message, property, method, command) {
  if (method && command) this.updateMessages(message, property, method, command)
   this.setState((prevState) => {
     const index = prevState.data.indexOf(prevState.data.find(msg => message.id === msg.id))
     return {
       data: [
         ...prevState.data.slice(0, index),
         { ...message, [property]: !message[property] },
         ...prevState.data.slice(index + 1),
       ]
     };
   })
 }

 updateMessages(changedContent, property, method, command, alternatePropertyValue) {
   let newProperty = alternatePropertyValue
   if (typeof changedContent[property] === 'boolean') newProperty = !changedContent[property];
   console.log([changedContent.id], command, newProperty);
   fetch(`http://localhost:8181/api/messages`, {method: method, body: JSON.stringify({messageIds: [changedContent.id], command: command, [command]: newProperty}), headers: new Headers({'Content-Type': 'application/json'}) })
   .then(response => {
     console.log(response);
   })
   .catch(err => {
     console.error(err);
   })
 }

 addMessage(message) {
   fetch(this.state.apiUrl, {method: 'POST', body: JSON.stringify(message), headers: new Headers({'Content-Type': 'application/json'}) })
   .then(response => {
     this.setState((prevState) => {
          return {
            messages: [...prevState.data, message],
            // showCompose: false
          }
        })
   })
   .catch(err => {
     console.error(err);
   })
 }





readEmail(message, state) {
  message.read = !state;
  this.updateMessages(message, 'read', 'PATCH', 'read')
  this.setState((prevState) => {
    const index = prevState.data.indexOf(prevState.data.find(msg => message.id === msg.id))
    return {
      data: [
        ...prevState.data.slice(0, index),
        { ...message, 'read': state },
        ...prevState.data.slice(index + 1),
      ]
    };
  })
}

changeLabel(message, label, state) {
  let command = '';
  command = state ? 'addLabel' : 'removeLabel'
  if (message.labels.indexOf(label) === -1 && label !== 'Apply label' && state) {
    message.labels.push(label)
  }
  if (message.labels.indexOf(label) !== -1 && !state){
    message.labels.splice(message.labels.indexOf(label), 1)
  }
    this.updateMessages(message, 'label', 'PATCH', command, label)
    this.setState((prevState) => {
      const index = prevState.data.indexOf(prevState.data.find(msg => message.id === msg.id))
      return {
        data: [
          ...prevState.data.slice(0, index),
          { ...message, 'labels': message.labels },
          ...prevState.data.slice(index + 1),
      ]
    };
  })
}

selectAllMessages() {
  this.setState((prevState) => {
    let totalMessageCount = prevState.data.length;
    let selectedMessageCount = prevState.data.reduce((count, msg) => {
      return msg.selected ? count + 1 : count + 0;
    }, 0);

    let newValue = selectedMessageCount === totalMessageCount ? false : true;

    return {
      messages: prevState.data.map((msg) => {
        msg.selected = newValue;
        return msg;
      })
    }
  })
}

countSelectedMessages(messages) {
   return messages.reduce((acc, msg) => {
     if (msg.selected === true) acc ++;
   });
 }

// shouldComponentUpdate(nextProps, nextState) {
//   if (!this.state.data[0]) {
//     return true;
//   }
//   return false;
// }

// componentWillUpdate(nextProps, nextState) {
// if (nextState.open == true && this.state.open == false) {
//   this.props.onWillOpen();
// }
// }

  componentDidMount() {
    this.fetchMessages();
  }



  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Toolbar messages={this.state.data} toggleProperty={this.toggleProperty} readEmail={this.readEmail} changeLabel={this.changeLabel} selectAllMessages={this.selectAllMessages} renderCompose={this.renderCompose} showCompose={this.state.showCompose} />
        <Compose showCompose={this.state.showCompose} />
        <Messages messages={this.state.data} toggleProperty={this.toggleProperty} readEmail={this.readEmail} showCompose={this.state.showCompose} />
      </div>
    );
  }
}

export default App;
