import React from 'react';
import { shallow, render, mount } from 'enzyme';
import { Message, mapStateToProps, mapDispatchToProps } from './Message';
import { toggleProperty, toggleSelected } from '../../actions';
import { BrowserRouter as Router } from 'react-router-dom';

describe('Message', () => {
  const testMessage = {
    _links: {
      self: {
        href: 'http://localhost:8181/api/messages/3',
      },
    },
    id: 3,
    subject: 'Use the 1080p HTTP feed, then you can parse the cross-platform hard drive!',
    starred: false,
    read: false,
    labels: ['dev'],
    selected: false,
  };

  it('has selected class when selected', () => {
    const message = shallow(
      <Message
        selected
        id={0}
        subject={''}
        starred={undefined}
        read={undefined}
        labels={['']}
      />,
    );
    expect(message.find('.message').hasClass('selected')).toEqual(true);
  });

  it('has read class when read', () => {
    const message = shallow(
      <Message
        read
        id={0}
        subject={''}
        starred={undefined}
        labels={['']}
      />,
    );
    expect(message.find('.message').hasClass('read')).toEqual(true);
  });

  it('has unread class when unread', () => {
    const message = shallow(
      <Message
        read={false}
        id={0}
        subject={''}
        starred={undefined}
        labels={['']}
      />,
    );
    expect(message.find('.message').hasClass('unread')).toEqual(true);
  });

  it('has full-star class when starred', () => {
    const message = shallow(
      <Message
        starred
        id={0}
        subject={''}
        read={undefined}
        labels={['']}
      />,
    );
    expect(message.find('.star').hasClass('fa fa-star')).toEqual(true);
  });

  it('has empty-star class when not starred', () => {
    const message = shallow(
      <Message
        starred={false}
        id={0}
        subject={''}
        read={undefined}
        labels={['']}
      />,
    );
    expect(message.find('.star').hasClass('fa fa-star-o')).toEqual(true);
  });

  it('has subject line when passed a subject', () => {
    const message = shallow(
      <Message
        starred={false}
        id={55}
        subject={'The firebase is burning down!'}
        read={undefined}
        labels={['']}
      />,
    );
    expect(message.find('.col-xs-11').contains('The firebase is burning down!')).toEqual(true);
  });

  // it('has a CHECKBOX that changes after click', () => {
  //   const toggleSelected = jest.fn();
  //   const message = shallow(
  //     <Message
  //       toggleSelected={toggleSelected}
  //       id={3}
  //       message={testMessage}
  //       subject={'Use the 1080p HTTP feed, then you can parse the cross-platform hard drive!'}
  //       labels={['dev']}
  //       selected={false}
  //       starred={false}
  //       read={false}
  //     />,
  //   );
  //
  //   const checkbox = message.find({ type: 'checkbox' });
  //
  //   console.log(checkbox.props());
  //
  //   expect(checkbox.props().checked).toEqual(false);
  //   checkbox.simulate('change');
  //   expect(checkbox.props().checked).toEqual(true);
  // });

  it('calls toggleSelected with proper arguments when checkbox is clicked', () => {
    const toggleSelected = jest.fn();
    const message = shallow(
      <Message
        toggleSelected={toggleSelected}
        id={3}
        message={testMessage}
        subject={'Use the 1080p HTTP feed, then you can parse the cross-platform hard drive!'}
        labels={['dev']}
        selected={false}
        starred={false}
        read={false}
      />,
    );

    const checkbox = message.find({ type: 'checkbox' });
    checkbox.simulate('change');
    expect(toggleSelected).toBeCalledWith(testMessage, 'selected');
  });

  // it('has a STAR icon that changes after click', () => {
  //   const toggleProperty = jest.fn();
  //   const message = shallow(
  //     <Message
  //       toggleProperty={toggleProperty}
  //       id={3}
  //       message={testMessage}
  //       subject={'Use the 1080p HTTP feed, then you can parse the cross-platform hard drive!'}
  //       labels={['dev']}
  //       selected={false}
  //       starred={false}
  //       read={false}
  //     />,
  //   );
  //
  //   const filledStar = message.find('.fa-star');
  //   const emptyStar = message.find('.fa-star-o');
  //
  //   // Before click, the empty star class is there, and the filled star class is not
  //   expect(emptyStar.length).toEqual(1);
  //   expect(filledStar.length).toEqual(0);
  //
  //   console.log(message.find('i').props());
  //   message.find('i').simulate('click');
  //
  //   // After click, the empty star class is gone, and the filled star class is there
  //   expect(emptyStar.length).toEqual(0);
  //   expect(filledStar.length).toEqual(1);
  // });

  it('calls toggleProperty with proper arguments when star is clicked', () => {
    const toggleProperty = jest.fn();
    const message = shallow(
      <Message
        toggleProperty={toggleProperty}
        id={3}
        message={testMessage}
        subject={'Use the 1080p HTTP feed, then you can parse the cross-platform hard drive!'}
        labels={['dev']}
        selected={false}
        starred={false}
        read={false}
      />,
    );

    const starIcon = message.find('i');
    starIcon.simulate('click');
    expect(toggleProperty).toBeCalledWith(testMessage);
  });

  it('mapStateToProps', () => {
    const state = {
      messages: {
        ids: [99],
        messagesById: {
          99: {
            id: 99,
            subject:
              "You can't have a race condition in the websocket without updating the headers",
            starred: false,
            read: false,
            labels: ['dev', 'personal'],
            selected: false,
          },
        },
      },
    };
    const ownProps = { messageId: 99 };
    const expected = {
      message: {
        id: 99,
        subject: "You can't have a race condition in the websocket without updating the headers",
        starred: false,
        read: false,
        labels: ['dev', 'personal'],
        selected: false,
      },
      id: 99,
      subject: "You can't have a race condition in the websocket without updating the headers",
      starred: false,
      read: false,
      labels: ['dev', 'personal'],
      selected: false,
    };
    expect(mapStateToProps(state, ownProps)).toEqual(expected);
  });

  it('mapDispatchToProps', () => {
    const dispatch = jest.fn();
    const toggleProperty = jest.fn();
    const toggleSelected = jest.fn();
    const bindActionCreators = jest.fn();

    const expected = bindActionCreators(
      {
        toggleProperty,
        toggleSelected,
      },
      dispatch,
    );

    expect(mapDispatchToProps(dispatch)).toHaveProperty('toggleProperty');
    expect(mapDispatchToProps(dispatch)).toHaveProperty('toggleSelected');
  });
});
