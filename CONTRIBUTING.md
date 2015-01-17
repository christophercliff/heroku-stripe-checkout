# Contributing

## Setup

Clone the project and install the dependencies:

```
$ git clone git@github.com:christophercliff/heroku-stripe-checkout.git
$ cd ./heroku-stripe-checkout/
$ npm install
```

## Tests

Create a `.env` file in the root of this project. It should resemble the following:

```
STRIPE_PUBLISHABLE_KEY=<your_stripe_test_publishable_key>
STRIPE_SECRET_KEY=<your_stripe_test_secret_key>
TEST_EMAIL=<your_email>
```

Then run:

```
$ npm test
```
