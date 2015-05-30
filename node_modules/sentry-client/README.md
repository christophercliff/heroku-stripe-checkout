# sentry-client

The smallest [Sentry](https://getsentry.com/) client for node.js.

## Installation

```
npm install sentry-client
```

## Usage

```js
var client = require('sentry-client').create({ dsn: YOUR_DSN })

client.sendError(new Error('Oops!')).then(function (data) {}, function (err) {})
// or
client.sendError(new Error('Oops!'), function (err, data) {})
```

## API

See [REFERENCE](https://github.com/christophercliff/sentry-client/blob/master/REFERENCE.md).

## Contributing

See [CONTRIBUTING](https://github.com/christophercliff/sentry-client/blob/master/CONTRIBUTING.md).

## License

See [LICENSE](https://github.com/christophercliff/sentry-client/blob/master/LICENSE.md).
