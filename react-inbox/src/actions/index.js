export const MESSAGES_RETRIEVED = 'MESSAGES_RETRIEVED'
export const TOGGLE_ATTRIBUTE = 'TOGGLE_ATTRIBUTE'
export const TOGGLE_SELECTED = 'TOGGLE_SELECTED'
export const COMPOSE_MESSAGE = 'COMPOSE_MESSAGE'
export const RENDER_COMPOSE = 'RENDER_COMPOSE'
export const DELETE_MESSAGE = 'DELETE_MESSAGE'
export const FETCH_BODY = 'FETCH_BODY'



export function fetchMessages() {
  return async (dispatch, getState, { Api }) => {
    const json = await Api.fetchMessages();
    console.log('this', json);

    json.forEach(message => {
      Api.fetchMessageById(message.id)
      .then(body => {
        message['foo'] = 'bar';
      })
    })
    const state = getState();
    if (!state.messages.ids.length) {
      await dispatch({
        type: MESSAGES_RETRIEVED,
        messages: json
      })
    }
  }
}

// export function fetchMessageBody(id) {
//   return async (dispatch, getState, { Api }) => {
//     // const json = await Api.fetchMessageById(id)
//     .then(body => {
//       return body
//     })
//
//     const state = getState
//   }
// }



export function toggleProperty(id, property, method, command, someBoolean) {
  return async (dispatch, getState, { Api }) => {
    const state = getState();
    await Api.updateMessages(id, property, method, command, someBoolean);

    await dispatch({
      type: TOGGLE_ATTRIBUTE,
      id,
      property,
      someBoolean
    })
  }
}

export function toggleSelected(id, selected) {
  return async (dispatch, getState) => {
    const state = getState();
    await dispatch({
      type: TOGGLE_SELECTED,
        id,
        selected
    })
  }
}

export const CHANGE_LABEL = 'CHANGE_LABEL'
export function changeLabel(id, command, changedLabel, labels) {
  return async (dispatch, getState, { Api }) => {
    const state = getState();
    let newLabels = labels.slice()

    if (command === 'addLabel' && newLabels.indexOf(changedLabel) === -1) {
      newLabels = [...newLabels, changedLabel]
    }
    else if (command === 'removeLabel' && newLabels.indexOf(changedLabel) !== -1) {
      newLabels.splice(newLabels.indexOf(changedLabel), newLabels.indexOf(changedLabel) + 1)
    }
    await Api.changeLabel(id, command, changedLabel);


    await dispatch({
      type: CHANGE_LABEL,
      id,
      newLabels
    })
  }
}

export function submitForm(form) {
	return async (dispatch, getState, { Api }) => {
    const state = getState();
    let id = Math.max.apply(Math, state.messages.ids) + 1;
    let newMessage = {
    ...form,
      id: id,
      read: false,
      starred: false,
      labels: [],
      selected: false
    }

    await Api.newMessage(newMessage.subject, newMessage.body)
    return dispatch({
			type: COMPOSE_MESSAGE,
      newMessage,
      id
		});
  }
}


export function deleteMessage(id) {
  return async (dispatch, getState, { Api }) => {
    const state = getState();
    await Api.deleteMessage(id);
    const json = await Api.fetchMessages();


    await dispatch({
      type: DELETE_MESSAGE,
      newMessages: json
    })
  }
}
