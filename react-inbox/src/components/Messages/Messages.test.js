
import React from 'react';
import { shallow, mount, render } from 'enzyme';
import toJson from 'enzyme-to-json';
import { Messages, mapStateToProps, mapDispatchToProps } from './Messages';
import { fetchMessages } from '../../actions';

describe('Messages', () => {
  it('should render an No new messages', () => {
    const component = shallow(<Messages messageIds={[]} loading={false} />);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('it should render Loading...', () => {
    const component = shallow(<Messages messageIds={[1]} loading />);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('it should render messages with props passed in', () => {
    const component = shallow(<Messages messageIds={[1]} loading={false} />);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('mapStateToProps', () => {
    const state = {
      messages: {
        ids: [1],
        messagesById: {
          1: {
            id: 1,
            subject: "You can't input the protocol without calculating the mobile RSS protocol!",
            starred: true,
            read: true,
            labels: ['dev', 'personal'],
            selected: false,
          },
        },
        messagesLoading: false,
      },
    };
    const expected = {
      loading: false,
      messageIds: [1],
    };
    expect(mapStateToProps(state)).toEqual(expected);
  });

  it('mapDispatchToProps', () => {
    const dispatch = jest.fn();
    const fetchMessages = jest.fn();
    const bindActionCreators = jest.fn();

    expect(mapDispatchToProps(dispatch)).toHaveProperty('fetchMessages');
  });

  it('Calls fetchMessages on load', () => {
    const fetchMessages = jest.fn();
    const component = mount(<Messages messageIds={[1]} loading fetchMessages={fetchMessages} />);
    expect(fetchMessages).toHaveBeenCalled();
  });
});
