import { combineReducers } from 'redux'
import { MESSAGES_RETRIEVED, TOGGLE_ATTRIBUTE, TOGGLE_SELECTED, CHANGE_LABEL, COMPOSE_MESSAGE, RENDER_COMPOSE, DELETE_MESSAGE } from '../actions'



function messages(state = { ids:[], messagesById:{} }, action) {
  switch (action.type) {
    case MESSAGES_RETRIEVED:
      const { messages } = action
      return {
        ids: messages.map((message) => {
          return message.id;
        }),
        messagesById: messages.reduce((result, message) => {
          result[message.id] = message
          console.log(result);
          return result
        }, {})
      }

      case TOGGLE_ATTRIBUTE:
        return {
        ...state,
        messagesById: {
          ...state.messagesById,
          [action.id]: {
            ...state.messagesById[action.id],
            [action.property]: !action.someBoolean
          }
        }
      };

      case TOGGLE_SELECTED:
        return {
          ...state,
          messagesById: {
            ...state.messagesById,
            [action.id]: {
              ...state.messagesById[action.id],
              selected: !action.selected
            }
          }
        };

        case CHANGE_LABEL:
          return {
          ...state,
          messagesById: {
            ...state.messagesById,
            [action.id]: {
              ...state.messagesById[action.id],
              labels: action.newLabels
            }
          }
        };


        case DELETE_MESSAGE:
          const { newMessages } = action
          return {
            ids: newMessages.map((message) => {
              return message.id;
            }),
            messagesById: newMessages.reduce((result, message) => {
              result[message.id] = message
              return result
            }, {})
          }

        case COMPOSE_MESSAGE:
          return {
            ids: [...state.ids, action.id],
            messagesById: {
            ...state.messagesById,
           [action.id]: action.newMessage
         }
      };


      default:
        return state
      }
    }

  function compose(state = false, action) {
	   switch (action.type) {


		default:
			return state;
	}
}

export default combineReducers({
  messages,
  compose
})
