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
    const state = getState();
    if (!state.messages.ids.length) {
      console.log(json);
      await dispatch({
        type: MESSAGES_RETRIEVED,
        messages: json
      })
    }
  }
}

export function fetchMessageBody(id) {
  return async (dispatch, getState, { Api }) => {
    const messageBody = await Api.fetchMessageById(id)
    .then(body => {
      return body
    })

    await dispatch({
      type: FETCH_BODY,
      messageBody,
      id
    })
  }
}



export function toggleProperty(ids, property, method, command, someBoolean) {
  return async (dispatch, getState, { Api }) => {
    const state = getState();
    await Api.updateMessages(ids, property, method, command, someBoolean);
    const currentMessages = Object.assign({}, state.messages.messagesById);
    ids.forEach(id => {
      currentMessages[id][property] = !someBoolean;
    })

    await dispatch({
      type: TOGGLE_ATTRIBUTE,
      currentMessages,
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


export function deleteMessage(deletedMessages) {
  return async (dispatch, getState, { Api }) => {
    const state = getState();
    await Api.deleteMessage(deletedMessages);
    const currentMessageIds = state.messages.ids.filter(id => deletedMessages.indexOf(id) === -1)
    const currentMessages = Object.assign({}, state.messages.messagesById);
    deletedMessages.forEach(id => {
      delete currentMessages[id]
    })


    await dispatch({
      type: DELETE_MESSAGE,
      currentMessageIds,
      currentMessages
    })
  }
}
