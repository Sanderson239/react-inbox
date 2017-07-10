Write tests for your Inbox application!

## Shallow Test Message Component

Write shallow tests for your Message component.  You should cover all of the code paths, including:

- Classnames when the message is selected vs unselected
- Classnames when the message is starred vs unstarred
- Classnames when the message is read vs unread

Also use `jest.fn()` to test that your callbacks work as expected by:

- Simulating the `change` on the checkbox
- Simulating the `click` event on the star

## Snapshot Test the Messages / MessageList Component

You should have a component that renders the list of messages.

Write a snapshot test for that component.

## Smoke Test the Toolbar Component

Write smoke tests for the Toolbar component.

Even though you aren't writing expectations, make sure to still cover the various code paths, such as:

- Some messages selected
- All messages selected
- No messages selected

## Write a Mount Test for App

Write a test that:

- mounts the app and renders 2 messages
- selects a message
- finds and clicks the deletes button
- expects that the deleted message is no longer there
- and that one of the toolbar buttons is disabled

> NOTE: If you put your seed data directly in App, you may want to take the time to inject that data via props from index.js.  Not a requirement, but it will make your tests easier, since you can pass data in the test directly.

Make sure that you end up with at least:

- 1 reducer test (pick the most complex one)
- 1 async action creator test (pick the most complex one)
- 1 test for a component that was created with `connect`


## How do you know you are done?

Run:

```
yarn test -- --coverage
```

You should see that you have 100% test coverage for your Message and Messages components.

- it's OK if `index.js` and `registerServiceWorker.js` is not covered
- unless you do extra work, Toolbar will not be 100% covered
