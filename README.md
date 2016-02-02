---

# :fire::fire::fire: DEPRECATED :fire::fire::fire:

Use [flatmarket-server-heroku](https://github.com/christophercliff/flatmarket-server-heroku). 

---

# heroku-stripe-checkout

A self-hosted service for accepting payments with [Stripe Checkout](https://stripe.com/docs/checkout).

## Usage

### 1. Click "Deploy to Heroku" and enter your configuration details.

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/christophercliff/heroku-stripe-checkout)

### 2. Insert the Stripe Checkout markup on your site

Using Stripe's [integration](https://stripe.com/docs/checkout#integration-simple) example. The form's `action` attribute should match the app you created in step 1.

```html
<form action="https://YOUR-APP.herokuapp.com/" method="POST">
    <script
        src="https://checkout.stripe.com/checkout.js"
        class="stripe-button"
        data-key="YOUR_PUBLISHABLE_KEY"
        data-name="YOUR_NAME"
        data-description="YOUR_DESCRIPTION"
        data-amount="YOUR_AMOUNT"
    ></script>
    <input name="amount" value="YOUR_AMOUNT" type="hidden">
    <input name="description" value="YOUR_DESCRIPTION" type="hidden">
    <input name="metadata" value="YOUR_METADATA" type="hidden">
</form>
```

#### Additional `input` Fields

Use `input` fields to send information about the charge to the server.

- **`amount`** `Number`

    The amount in cents. This should match the amount in the `data-attribute` field. *Required*.

- **`description`** `String`

    A description of the transaction. If present, the server will include it when creating the charge.

- **`metadata`** `String`

    A JavaScript Object, stringified and HTML encoded. This field allows you to dynamically add information about the charge from the frontend, e.g. `{ product_id: '12345' }`. If present, the server will decode and include it when creating the charge.

## Contributing

See [CONTRIBUTING](https://github.com/christophercliff/heroku-stripe-checkout/blob/master/CONTRIBUTING.md).

## License

See [LICENSE](https://github.com/christophercliff/heroku-stripe-checkout/blob/master/LICENSE.md).
