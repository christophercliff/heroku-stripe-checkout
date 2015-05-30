# hapi-nudge

[![Build Status](https://travis-ci.org/christophercliff/hapi-nudge.png?branch=master)](https://travis-ci.org/christophercliff/hapi-nudge)

A [Hapi](http://hapijs.com/) plugin to prevent Heroku dynos from sleeping.

## Installation

```
npm install hapi-nudge
```

## Usage

```js
var Nudge = require('hapi-nudge')

server.register({
    register: Nudge,
    options: options,
})
```

#### Options

- **`hostname`** `String`

    The hostname. Default `server.info.host`.

- **`pathname`** `String`

    The pathname. Default `'/nudge'`.

- **`port`** `Number`

    The port. Default `server.info.port`.

- **`protocol`** `String`

    The protocol. Default `server.info.protocol`.

- **`interval`** `Number`

    How often the server should be nudged. Default `60e3`.

## License

See [LICENSE](https://github.com/christophercliff/hapi-nudge/blob/master/LICENSE.md).
