## ClockPay API SDK
ClockPay API SDK is a simple Node.js SDK to integrate with ClockPay services. It helps you interact with ClockPay's payment links, currencies, and more.

## Installation
```bash
$ npm install clockpay
```

```bash
$ yarn add clockpay
```
## Using npm:


## Usage
Importing the SDK using ES modules

```
import { ClockPay } from 'clockpay';
```

## Initialize 
```
const clockpay = new ClockPay(
  'cpay_live_sk_.....'
);
```

## Example
```
const link = await clockpay.link.create({
  amount: 10000,
  networkId: '2084c02a-a972-40d4-806d-7c9fab3aa0eb',
  coinId: 'ecac2fbe-f73a-4d1e-918c-58385d4fa531',
  currency: 'ngn',
  reference: '2084c02a-a972-40d4-806d-7c9fab3aawqwc',
  meta: {
    title: 'Simple',
    customerId: 'string',
    email: 'sample@gmail.com',
    fullName: 'Musa Chinedu',
  },
});
console.log(link);
```

## Methods
Currency Methods

getCurrencies
Description: Retrieves a list of available currencies.
```
Example:
const currencies = await clockpay.currency.getCurrencies();
console.log(currencies);
```

getCurrencyNetwork

Description: Fetches information for a specific currency by its ID.
Parameters:
currencyId (string) - The ID of the currency.
```
const currencyNetwork = await clockpay.currency.getCurrencyNetwork('----');
console.log(currencyNetwork);
```

Link Methods
create
Description: Creates a new payment link.
Parameters:
payload (object) - The payment link data object.
amount (number) - The payment amount.
businessId (string) - The business ID.
networkId (string) - The network ID.
coinId (string) - The coin ID.
currency (string) - The currency of the payment (e.g., 'ngn').
reference (string) - Unique reference for the transaction.
meta (object) - Metadata associated with the payment, including title, customerId, email, and fullName.

License
MIT License
