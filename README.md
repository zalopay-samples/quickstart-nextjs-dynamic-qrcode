# Quick Start: Dynamic QR Code

- [Quick Start: Dynamic QR Code](#quick-start-dynamic-qr-code)
  - [Overview](#overview)
  - [Requirements](#requirements)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Troubleshooting](#troubleshooting)
    - [Callback testing](#callback-testing)
    - [Making your server reachable](#making-your-server-reachable)
    - [Callback setup](#callback-setup)
  - [Author(s)](#authors)
  - [Acknowledgement](#acknowledgement)



## Overview

This repository includes examples of integrations for online payments with ZaloPay [Dynamic QR Code](https://docs.zalopay.vn/v2/payments/qrcode/overview.html). Within this demo app, you'll find a simplified version of an e-commerce website, complete with commented code to highlight key features and concepts of ZaloPay's API.

![Card checkout demo](public/images/demo-qrscan.gif)

## Requirements

Node.js 16+

## Installation

1. Clone this repo:

```
git clone 
```

2. Navigate to the root directory and install dependencies:

```
npm install
```

## Usage

1. Update `next.config.js` file with your [Merchant information](https://docs.zalopay.vn/v2/start/):

```sh
ZLP_MERCHANT_APP_ID="your_app_id_here"
ZLP_MERCHANT_KEY1="your_key1_here"
ZLP_MERCHANT_KEY2="your_key2_here"
ZLP_MERCHANT_ENDPOINT="zalopay_merchant_endpoint_here"
```
Or you can use this [testing merchant account](https://docs.zalopay.vn/v2/start/#A-V).

2. Build & Start the server:

```sh
npm run dev
```

3. Visit [http://localhost:3000/](http://localhost:3000/) to select an integration type.

To try out payment you need install and register ZaloPay Sanbox , see [Trải nghiệm với ZaloPay](https://docs.zalopay.vn/v2/start/#A).

**Note**

This example doesn't include the callback when run at localhost, see how to integration callback in next section

## Troubleshooting

### Callback testing

Callback (a.k.a Webhook) is a mechanism to deliver Instant Payment Notification asynchronously for Merchant Server receives payment's results from ZaloPay Server, only when ZaloPay has received money from user successfully, and it is important to test them during the setup of your integration.
You can find more information about callbacks in [here](https://docs.zalopay.vn/en/v2/general/overview.html#callback).

This sample application provides a simple callbacks integration exposed at `/api/callback`. For it to work, you need to:

1. Provide a way for the ZaloPay Server to reach your running application
2. Add a callback url to ZaloPay Server notify to your application.

### Making your server reachable

Your endpoint that will consume the incoming callback must be publicly accessible.

There are typically many options, in this example we can expose your localhost with tunneling software (i.e. ngrok)

If you use a tunneling service like [ngrok](ngrok) the webhook URL will be the generated URL (ie `https://c991-80-113-16-28.ngrok.io`)

```bash
  $ ngrok http 3000
  
  Session Status                online                                                                                           
  Account                       ############                                                                      
  Version                       #########                                                                                          
  Region                        United States (us)                                                                                 
  Forwarding                    https://c991-80-113-16-28.ngrok.io -> http://localhost:3000           
```

**Note:** when restarting ngrok a new URL is generated, make sure to **update the Webhook URL** in the Merchant Portal

### Callback setup

There are 2 way to set up a callback URL:

- Update `ZLP_MERCHANT_CALLBACK_URL` config in `next.config.js` file by ngrok url, example: `https://c991-80-113-16-28.ngrok.io/api/callback`. This value will send as params
in order creation API. See more about [Order Information](https://docs.zalopay.vn/en/v2/general/overview.html#order-creation_order-information).
- Set up in [Sanbox Merchant Portal](https://sbmc.zalopay.vn/home).

If the callback setup is worked, the following message is shown:

```text
💰  Payment Callback received!
✅  Update order's status = success where app_trans_id = 230224_353137
```
## Author(s)

- [Phuc Vo](https://github.com/NoRaDoMi)

## Acknowledgement

This quick start is built upon [AlterClass.io](https://github.com/AlterClassIO/ecommerce-nextjs-stripe-checkout). 