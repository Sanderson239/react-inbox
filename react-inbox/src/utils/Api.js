export default class Api {

  static fetchMessages() {
      return fetch('http://localhost:8181/api/messages').then(response => response.json())
      .then(json => {
				return json._embedded.messages;
			})
			.catch(err => {
				throw err;
			});
    }

    static fetchMessageById(id) {
        return fetch(`http://localhost:8181/api/messages/${id}`).then(response => response.json())
        .then(json => {
  				return json.body;
  			})
  			.catch(err => {
  				throw err;
  			});
      }

  static updateMessages(id, property, method, command, someBoolean) {
    fetch(`http://localhost:8181/api/messages`, {method: method, body: JSON.stringify({messageIds: [id], command: command, [command]: !someBoolean}), headers: new Headers({'Content-Type': 'application/json'}) })
   .then(response => {
     return response;
   })
   .catch(err => {
     console.error(err);
   })
 }

 static changeLabel(id, command, changedLabel) {
   fetch(`http://localhost:8181/api/messages`, {method: 'PATCH', body: JSON.stringify({messageIds: [id], command: command, label: changedLabel}), headers: new Headers({'Content-Type': 'application/json'}) })
  .then(response => {
    return response;
  })
  .catch(err => {
    console.error(err);
  })
}

static newMessage(subject, body) {
  fetch(`http://localhost:8181/api/messages`, {method: 'POST', body: JSON.stringify({subject: subject, body: body, read: false, starred: false, labels: [], selected: false}), headers: new Headers({'Content-Type': 'application/json'}) })
 .then(response => {
   return response;
 })
 .catch(err => {
   console.error(err);
 })
}

static deleteMessage(id) {
  fetch(`http://localhost:8181/api/messages`, {method: 'PATCH', body: JSON.stringify({messageIds: [id], command: 'delete'}), headers: new Headers({'Content-Type': 'application/json'}) })
 .then(response => {
   return response;
 })
 .catch(err => {
   console.error(err);
 })
}



}
