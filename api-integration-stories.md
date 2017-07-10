NOTE: Make sure you have the API server setup locally.  You can learn more [here](./setup-api-server.exercise.md)

1. Load the messages initially
1. Post all of the actions:
  - star / unstar
  - mark read / unread
  - add / remove labels
  - delete
1. Add a "compose" view

## Load the messages from the server

```
When a user goes to your inbox app
The messages they see should be the ones loaded from the server
```

## Actions should update the server-side

```
When a user stars or unstars a message
And then reloads the page
They should see that the data has been persisted

When a user marks messages read or unread
Or deletes messages
Or adds or removes labels
And then refreshes the page
Then they should see that the data has been persisted
```

> NOTE: the server-side API you are running locally runs _in memory_, so if you restart it, the data will reset.

## Add the ability to compose messages

```
When a user goes to the app
They should see a red plus button
And when they click that button
Then a compose form should appear
And when they fill out the subject and body and press Send
Then the compose form should go away
And the message should appear on the page
And when they refresh, the message should still appear (it's persisted on the server)

When a user opens the compose form
And then presses the red compose button
Then the compose form should close
```

It should look like this:

![](/images/inbox/compose-button.png)

![](/images/inbox/compose-form.png)
