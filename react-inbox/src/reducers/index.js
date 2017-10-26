import { combineReducers } from 'redux'
import { MESSAGES_RETRIEVED, FETCH_BODY, TOGGLE_ATTRIBUTE, TOGGLE_SELECTED, CHANGE_LABEL, COMPOSE_MESSAGE, RENDER_COMPOSE, DELETE_MESSAGE } from '../actions'



function messages(state = { ids:[], messagesById:{} }, action) {
  switch (action.type) {
    case MESSAGES_RETRIEVED:
      const { messages } = action
      console.log(messages);
      console.log(messages.reduce((result, message) => {
        result[message.id] = message
        return result
      }, {}));
      return {
        ids: messages.map((message) => {
          return message.id;
        }),
        messagesById: messages.reduce((result, message) => {
          result[message.id] = message
          return result
        }, {})
      }

      case FETCH_BODY:
        const { messageBody } = action
        return {
        ...state,
        messagesById: {
          ...state.messagesById,
          [action.id]: {
            ...state.messagesById[action.id],
            body: messageBody
            }
          }
        };

      case TOGGLE_ATTRIBUTE:
        return {
        ...state,
        messagesById: action.currentMessages
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
          const { currentMessageIds, currentMessages } = action
          return {
            ids: currentMessageIds,
            messagesById: currentMessages
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



export default combineReducers({
  messages,
})
