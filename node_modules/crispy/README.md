# Crispy

This is a guide for writing consistent and aesthetically pleasing JavaScript. It is inspired by what is popular within the community, and flavored with some personal opinions.

It includes configuration for [JSHint](https://github.com/jshint/jshint/) and [JSCS](https://github.com/jscs-dev/node-jscs).

## Installation

```
$ npm install crispy
```

## Usage

```
$ ./node_modules/.bin/crispy ./lib/ ./test/
```

Better yet, include in your test runner so violations break the build:

```json
"scripts": {
  "style": "./node_modules/.bin/crispy ./lib/ ./test/",
  "test": "npm run style && ./node_modules/.bin/mocha"
}
```

## The Rules

### 4 Spaces for indention

Use 4 spaces for indenting your code and swear an oath to never mix tabs and
spaces—a special kind of hell is awaiting you otherwise.

### Newlines

Use UNIX-style newlines (`\n`), and a newline character as the last character
of a file. Windows-style newlines (`\r\n`) are forbidden inside any repository.

### No trailing whitespace

Just like you brush your teeth after every meal, you clean up any trailing whitespace in your JS files before committing. Otherwise the rotten smell of careless neglect will eventually drive away contributors and/or co-workers.

### Don't use semicolons unless you have to

There are rare occasions where you need a semicolon. Read about them [here](http://blog.izs.me/post/2353458699/an-open-letter-to-javascript-leaders-regarding).

### 80(ish) characters per line

Limit your lines to 80 characters. Yes, screens have gotten much bigger over the last few years, but your brain has not. Use the additional room for split screen, your editor supports that, right? And increase the font size so your colleague standing behind can read it too.

### Use single quotes

Use single quotes, unless you're writing JSON.

*Right:*

```js
var foo = 'bar'
```

*Wrong:*

```js
var foo = "bar"
```

### Opening braces go on the same line

Your opening braces go on the same line as the statement.

*Right:*

```js
if (true) {
    console.log('winning')
}
```

*Wrong:*

```js
if (true)
{
    console.log('losing')
}
```

Also, notice the use of whitespace before and after the condition statement.

### Declare one variable per var statement

Declare one variable per var statement, it makes it easier to re-order the lines. Put them at the beginning of the function body.

*Right:*

```js
var keys   = ['foo', 'bar']
var values = [23, 42]
var object = {}
var key

while (items.length) {
    key = keys.pop()
    object[key] = values.pop()
}
```

*Wrong:*

```js
var keys = ['foo', 'bar'],
    values = [23, 42],
    object = {},
    key;

while (items.length) {
    key = keys.pop()
    object[key] = values.pop()
}
```

### Use lowerCamelCase for variables, properties and function names

Variables, properties and function names should use `lowerCamelCase`.  They should also be descriptive. Single character variables and uncommon abbreviations should generally be avoided.

*Right:*

```js
var adminUser = db.query('SELECT * FROM users ...')
```

*Wrong:*

```js
var admin_user = db.query('SELECT * FROM users ...')
```

### Use UpperCamelCase for class names

Class names should be capitalized using `UpperCamelCase`.

*Right:*

```js
function BankAccount() {}
```

*Wrong:*

```js
function bank_Account() {}
```

### Use UPPERCASE for Constants

Constants should be declared as regular variables or static class properties, using all uppercase letters.

Node.js/V8 actually supports mozilla's [const][const] extension, but
unfortunately that cannot be applied to class members, nor is it part of any
ECMA standard.

*Right:*

```js
var SECOND = 1 * 1000

function File() {}

File.FULL_PERMISSIONS = 0777
```

*Wrong:*

```js
const SECOND = 1 * 1000

function File() {}

File.fullPermissions = 0777
```

[const]: https://developer.mozilla.org/en/JavaScript/Reference/Statements/const

### Object/Array creation

Use trailing commas and put *short* declarations on a single line. Only quote keys when your interpreter complains:

*Right:*

```js
var a = ['hello', 'world']
var b = {
    good: 'code',
    'is generally': 'pretty'
}
```

*Wrong:*

```js
var a = [
  'hello', 'world'
]
var b = {"good": 'code'
        , is generally: 'pretty'
        }
```

### Use the === operator

Programming is not about remembering [stupid rules][comparisonoperators]. Use the triple equality operator as it will work just as expected.

*Right:*

```js
var a = 0
if (a === '') {
    console.log('winning')
}

```

*Wrong:*

```js
var a = 0
if (a == '') {
    console.log('losing')
}
```

[comparisonoperators]: https://developer.mozilla.org/en/JavaScript/Reference/Operators/Comparison_Operators

### Use multi-line ternary operator

The ternary operator should not be used on a single line. Split it up into multiple lines instead.

*Right:*

```js
var foo = (a === b)
    ? 1
    : 2
```

*Wrong:*

```js
var foo = (a === b) ? 1 : 2
```

### Do not extend built-in prototypes

Do not extend the prototype of native JavaScript objects. Your future self will be forever grateful.

*Right:*

```js
var a = []
if (!a.length) {
    console.log('winning')
}
```

*Wrong:*

```js
Array.prototype.empty = function() {
    return !this.length
}

var a = []
if (a.empty()) {
    console.log('losing')
}
```

### Use descriptive conditions

Any non-trivial conditions should be assigned to a descriptive variable:

*Right:*

```js
var isAuthorized = (user.isAdmin() || user.isModerator())
if (isAuthorized) {
    console.log('winning')
}
```

*Wrong:*

```js
if (user.isAdmin() || user.isModerator()) {
    console.log('losing')
}
```

### Write small functions

Keep your functions short. A good function fits on a slide that the people in the last row of a big room can comfortably read. So don't count on them having perfect vision and limit yourself to ~15 lines of code per function.

### Return early from functions

To avoid deep nesting of if-statements, always return a function's value as early as possible.

*Right:*

```js
function isPercentage(val) {
    if (val < 0) return false
    if (val > 100) return false
    return true
}
```

*Wrong:*

```js
function isPercentage(val) {
    if (val >= 0) {
        if (val < 100) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}
```

### Don't nest closures

Use closures, but try not to nest them. Otherwise your code will become a mess.

*Right:*

```js
setTimeout(function() {
    client.connect(afterConnect)
}, 1e3)

function afterConnect() {
    console.log('winning')
}
```

*Wrong:*

```js
setTimeout(function() {
    client.connect(function() {
        console.log('losing')
    })
}, 1e3)
```

### Callbacks must be ALWAYS immediate or ALWAYS deferred

isaacs posted a nice explanation [here](http://blog.izs.me/post/59142742143/designing-apis-for-asynchrony).

*Right:*

```js
function myAsyncFn(stuff, callback) {
    if (!stuff) {
        return process.nextTick(function(){
            return callback(new Error('stuff is undefined'))
        })
    }
    return doSomeSlowStuff(stuff, callback)
}
```

*Wrong:*

```js
function myAsyncFn(stuff, callback) {
    if (!stuff) {
        return callback(new Error('stuff is undefined')) // Sometimes returns now...
    }
    return doSomeSlowStuff(stuff, callback) // Other times returns later
}
```

### Object.freeze, Object.preventExtensions, Object.seal, with, eval

Crazy shit that you will probably never need. Stay away from it.

## License

MIT, see [LICENSE](https://github.com/christophercliff/crispy/blob/master/LICENSE.md) for details.

## Acknowledgements

The original version of this guide was created by [Felix Geisendörfer](http://felixge.de/).
