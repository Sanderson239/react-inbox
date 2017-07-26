import { messages } from './index';
import * as CONST from '../constants/constants';

describe('Test message reducer', () => {
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


  it('MESSAGES_RETRIEVED', () => {
    const returnValue = messages(null, {
      type: MESSAGES_RETRIEVED,
      messages: [testMessage],
    });

    expect(returnValue).toEqual({
      ids: [1],
      messagesById: {
        1: testMessage,
      },
      messagesLoading: false,
    });
  });
});
