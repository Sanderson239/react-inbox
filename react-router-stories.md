Add routes to your Inbox application!

This checkpoint should take 3-4 hours to complete.

## The Compose Route

Scenario: toggling the compose form

```
Given I am on the root path `/`
When I click on the compose button
Then the message compose form should appear
And the route should be `/compose`
```

Scenario: going directly to the compose route

```
Given I go directly to the /compose route
Then the compose form should be open
And when I click on the compose button
Then the compose form should close
```

Scenario: creating a message

```
Given I am on the /compose route
And I send a message
Then the compose form should close after the message is sent
```

## The Message Show Route

Scenario: clicking on a message subject

```
Given I am on the root path `/`
When I click on the subject of a message
Then the route should change to /messages/:id
And I should see the message body expanded
And the message should be marked as read
```

Scenario: Visiting the message route directly

```
Given I go directly to a message route with /messages/:id
Then I should see the message body expanded
And the message should be marked as read
```

NOTE: the message body is _not_ available from the `/api/messages` API endpoint.  You'll have to make a call to the `/api/messages/:id` endpoint to get the body.

## Route Interaction

```
When I open the compose form
And then click on a message
Then the compose form should close

And if I have opened a message
And I click on another message
Than the first message should close
```
