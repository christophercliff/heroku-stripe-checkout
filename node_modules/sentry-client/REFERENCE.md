# v1.0.x API Reference

- [`Client.create(options)`](#clientcreateoptions)
- [`Client` Instance Methods](#client-instance-methods)
    - [`client.sendError(error[, options][, callback])`](#clientsenderrorerror-options-callback)
    - [`client.sendMessage(message[, options][, callback])`](#clientsendmessagemessage-options-callback)

## `Client.create(options)`

Creates the client.

```js
var client = Client.create(options)
```

#### `options`

- **`dsn`** `String`

    The Sentry DSN. *Required*.

## `Client` Instance Methods

All methods return promises and accept an optional callback function.

```js
client.sendError(new Error('Oops!')).then(function (data) {}, function (err) {})
// or
client.sendError(new Error('Oops!'), function (err, data) {})
```

### `client.sendError(error[, options][, callback])`

Sends the error.

```js
client
    .sendError(error, options)
    .then(function(data){})
```

- **`error`** `Error`

    The error. *Required*.

- **`options`** `Object`

    Metadata about the error. Default `undefined`.

### `client.sendMessage(message[, options][, callback])`

Sends the message.

```js
client
    .sendMessage(message, options)
    .then(function(data){})
```

- **`message`** `String`

    The message. *Required*.

- **`options`** `Object`

    Metadata about the message. Default `undefined`.
