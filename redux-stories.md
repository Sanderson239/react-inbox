Convert your Inbox to Redux!

This should take about **4 hours** to complete.  You've already done the heavy lifting, this is all just refactoring.

You should roughly follow these steps (not necessarily in this order):

- Use yarn to add `redux react-redux redux-thunk`
- Create a reducer (will eventually have ~13 cases in the `switch` statement)
- Configure a store with `redux-thunk` and the reducer
- Move all of the async actions from the app to ~11 action creators
- Your App should be a connected component with `mapStateToProps` / `mapDispatchToProps`
  - note: you may optionally choose to `connect` other components - up to you

Ensure that all of the following actions work:

- Toggling the compose button
- Sending a message (closes the form, adds the message to the list)
- Selecting / deselecting all messages
- Marking messages as read / unread
- Adding / removing labels from messages
- Deleting messages
- Keeping the "unread message" count in sync
- Selecting / deselecting an individual message
- Starring / unstarring an individual message
- Making sure all actions update the server
