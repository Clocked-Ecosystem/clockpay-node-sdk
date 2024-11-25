# ClockPay Node SDK

[![npm version](https://badge.fury.io/js/clockpay.svg)](https://badge.fury.io/js/clockpay)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A lightweight and type-safe Node.js SDK for integrating with ClockPay payment services. This SDK helps interact with ClockPay's payment links, currencies, and more.

## Installation

Using npm:
```bash
npm install clockpay
```

Using yarn:
```bash
yarn add clockpay
```

Using pnpm:
```bash
pnpm add clockpay
```

## Usage
Importing the SDK using ES modules

```
import { ClockPay } from 'clockpay';
```

## Quick Start

```typescript
import { ClockPay } from 'clockpay';

// Initialize the SDK
const clockpay = new ClockPay('cpay_live_sk_your_api_key');

// Create a payment link
async function createPaymentLink() {
  try {
    const link = await clockpay.link.create({
      amount: 10000,
      networkId: '2084c02a-a972-40d4-806d-7c9fab3aa0eb',
      coinId: 'ecac2fbe-f73a-4d1e-918c-58385d4fa531',
      currency: 'ngn',
      reference: '2084c02a-a972-40d4-806d-7c9fab3aawqwc',
      meta: {
        title: 'Product Purchase',
        email: 'customer@example.com',
        fullName: 'John Doe',
        // Optional fields
        customerId: 'CUST123',
        description: 'Premium package purchase',
        phoneNumber: {
          code: '+234',
          number: '8012345678',
          local: '8012345678'
        }
      }
    });
    
    console.log('Payment link created:', link.data.link);
  } catch (error) {
    console.error('Error creating payment link:', error.message);
  }
}
```

## API Reference

### Currency Methods

#### Get All Currencies

Retrieves a list of available currencies.

```typescript
const currencies = await clockpay.currency.getCurrencies();
```

Response type:
```typescript
interface Currency {
  id: string;
  name: string;
  image: string;
  code: string;
}
```

#### Get Currency Network

Fetches network information for a specific currency.

```typescript
const network = await clockpay.currency.getCurrencyNetwork('network_id');
```

Response type:
```typescript
interface CurrencyNetwork {
  id: string;
  name: string;
  tag: string;
  code: string;
}
```

### Payment Link Methods

#### Create Payment Link

Creates a new payment link for processing transactions.

```typescript
const link = await clockpay.link.create({
  amount: number;
  networkId: string;
  coinId: string;
  currency: string;
  reference: string;
  meta: {
    title?: string;
    description?: string;
    url?: string;
    redirectUrl?: string;
    customerId?: string;
    email: string;
    fullName: string;
    phoneNumber?: {
      code: string;
      number: string;
      local: string;
    };
  };
});
```

Response type:
```typescript
interface CreateLinkResponse {
  message: string;
  data: {
    link: string;
    reference: string;
  };
}
```

### Link Methods

#### Create Payment Link

Creates a new payment link for processing transactions.

```typescript
const link = await clockpay.link.create({
  amount: 10000,
  networkId: "network_id",
  coinId: "coin_id",
  currency: "ngn",
  reference: "unique_reference",
  meta: {
    email: "customer@example.com",
    fullName: "John Doe"
  }
});
```

##### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `amount` | `number` | Yes | The payment amount in the smallest currency unit (e.g., kobo for NGN, cents for USD). Example: 10000 = ₦100.00 |
| `networkId` | `string` | Yes | The unique identifier for the blockchain network to be used for the transaction. Can be obtained using `currency.getCurrencyNetwork()` |
| `coinId` | `string` | Yes | The unique identifier for the cryptocurrency to be used. Can be obtained using `currency.getCurrencies()` |
| `currency` | `string` | Yes | The fiat currency code for the payment amount (e.g., 'ngn', 'usd', 'eur'). Must be in lowercase |
| `reference` | `string` | Yes | A unique identifier for this transaction. Must be unique across all your transactions |
| `meta` | `object` | Yes | Additional information about the transaction |

##### Meta Object Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `email` | `string` | Yes | Customer's email address |
| `fullName` | `string` | Yes | Customer's full name |
| `title` | `string` | No | Title or purpose of the payment |
| `description` | `string` | No | Detailed description of what the payment is for |
| `url` | `string` | No | Custom URL associated with the payment |
| `redirectUrl` | `string` | No | URL to redirect to after successful payment |
| `customerId` | `string` | No | Your internal customer identifier |
| `phoneNumber` | `object` | No | Customer's phone number details |

##### Phone Number Object Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `code` | `string` | No | Country code (e.g., '+234') |
| `number` | `string` | No | Phone number without country code |
| `local` | `string` | No | Local format of the phone number |

##### Response

```typescript
interface CreateLinkResponse {
  message: string;
  data: {
    link: string;     // The generated payment link URL
    reference: string // The reference you provided
  };
}
```

##### Example Usage

```typescript
try {
  const link = await clockpay.link.create({
    amount: 10000, // ₦100.00
    networkId: "2084c02a-a972-40d4-806d-7c9fab3aa0eb",
    coinId: "ecac2fbe-f73a-4d1e-918c-58385d4fa531",
    currency: "ngn",
    reference: "INV-123-456",
    meta: {
      title: "Premium Subscription",
      description: "Annual subscription to premium features",
      email: "customer@example.com",
      fullName: "John Doe",
      customerId: "CUST-123",
      phoneNumber: {
        code: "+234",
        number: "8012345678",
        local: "8012345678"
      },
      redirectUrl: "https://yourapp.com/payment/success"
    }
  });

  console.log('Payment link created:', link.data.link);
  console.log('Reference:', link.data.reference);
} catch (error) {
  console.error('Error creating payment link:', error.message);
}
```

##### Error Handling

The create method can throw the following errors:

| Error Code | Description |
|------------|-------------|
| `VALIDATION_ERROR` | Missing or invalid required fields |
| `AUTHENTICATION_ERROR` | Invalid or expired API key |
| `API_ERROR` | Server-side error from ClockPay |
| `UNKNOWN_ERROR` | Unexpected errors |

```typescript
try {
  const link = await clockpay.link.create(/* ... */);
} catch (error) {
  if (error instanceof ClockPayError) {
    switch (error.code) {
      case 'VALIDATION_ERROR':
        console.error('Invalid input:', error.message);
        break;
      case 'AUTHENTICATION_ERROR':
        console.error('Authentication failed:', error.message);
        break;
      default:
        console.error('Error:', error.message);
    }
  }
}
```

##### Important Notes

1. The `amount` should always be in the smallest unit of the currency (kobo for NGN, cents for USD)
2. The `reference` must be unique for each transaction
3. Both `networkId` and `coinId` can be obtained using the Currency Methods
4. All string values should be properly sanitized before sending
5. The generated payment link has an expiration time
6. The `redirectUrl` must be a valid HTTPS URL if provided


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

