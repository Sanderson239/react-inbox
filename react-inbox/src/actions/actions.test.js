import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from './index';
import * as CONST from '../constants/constants';
import { fetchMessages } from './index';

describe('Actions', () => {
  const testMessage = {
    _links: {
      self: {
        href: 'http://localhost:8181/api/messages/1',
      },
    },
    id: 1,
    subject: 'some content',
    starred: true,
    read: false,
    labels: ['dev'],
    selected: false,
  };



  it('fetchMessages', () => {
    const mockApiFetchProducts = jest.fn();
    mockApiFetchProducts.mockReturnValue(
      Promise.resolve({
        _embedded: {
          messages: [testMessage],
        },
      }),
    );

    const extraArgument = {
      Api: {
        fetchMessages: mockApiFetchProducts,
      },
    };

    const initialState = {
      messages: {
        ids: [1],
        messagesById: { 1: testMessage },
      },
    };

    const expectedActions = [
     {
       type: MESSAGES_RECEIVED,
       messages: [{id: 1, subject: 'some content', starred, true, read: false, labels: ['dev'], selected: false}]
     }
   ]

   const mockStore = configureStore([thunk.withExtraArgument(extraArgument)]);
   const store = mockStore(initialState);

   return store.dispatch(fetchMessages()).then(() => {
     expect(store.getActions()).toEqual(expectedActions);
   });
 });
});
