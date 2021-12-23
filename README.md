# Wallet

## Introduction

The wallet provider is a plug-in that integrates various blockchain wallet APIs to connect to Dapp (send transactions, personal signatures, deploy contracts).

Now integrated Metamask, Walletconnect, Walletlink(Coinbase Wallet), Fortmatic, Portis, Waxio(Wax Cloud Wallet), Phantom, Sollet.

Other wallets are being supported one after another (Walletconnect protocol has been adopted by dozens of popular wallets).

The src directory is the source code implementation of the plug-in, and the lib directory is the compiled file (ES2021).

The UI self-service interface has not been provided, and it needs to be implemented by itself (because it is only built with JS, I want to apply it in any JS environment, not in the specified framework).

Support TS, comes with type declaration file.✅

For more configuration details of the following tutorial, please move to the relevant official website.😊

## Code Repository

[https://github.com/Anunnakill/Wallet](https://github.com/Anunnakill/Wallet)

## Installation

### npm

```bash
npm i --save wallet-ethers
```

### yarn

```bash
yarn add wallet-ethers
```

## Usage

### ES6

```javascript
import Wallet from "wallet-ethers";
```

```javascript
// The first parameter: Wallet to use.
// metamask or walletconnect or walletlink or fortmatic or portis or waxio or phantom, sollet (Note that the initial letter is lowercase).

// The second parameter: Required configuration of the wallet.

// Metamask: No need.
const wallet = new Wallet("metamask", {});

// Phantom: No need.
const wallet = new Wallet("phantom", {});

// Walletconnect: { rpc }.
// Already built-in RPC ⬇️
// {
//   "250": "https://rpc.ftm.tools/",
//   "56": "https://bsc-dataseed.binance.org/",
//   "80001": "https://rpc-mumbai.matic.today",
//   "137": "https://rpc-mainnet.matic.network",
//   "1313161555": "https://testnet.aurora.dev",
//   "1313161554": "https://mainnet.aurora.dev",
//   "4002": "https://rpc.testnet.fantom.network/",
//   "43114": "https://api.avax.network/ext/bc/C/rpc",
//   "43113": "https://api.avax-test.network/ext/bc/C/rpc",
//   "97": "https://data-seed-prebsc-1-s1.binance.org:8545/",
//   "3": "https://ropsten.infura.io/v3/9e332d39364f4491aec5414fcbc4def7",
//   "1": "https://mainnet.infura.io/v3/9e332d39364f4491aec5414fcbc4def7"
// }
const wallet = new Wallet("walletconnect", {
  rpc: {
    // You can add other RPC.
  },
});

// Walletlink: { appName, appLogoUrl, darkMode, network }.
const wallet = new Wallet("walletlink", {
  appName: "Demo",
  appLogoUrl: "https://demo.png",
  darkMode: false,
  network: "mainnet" || "ropsten", // Can only choose mainnet or ropsten.
});

// Fortmatic: { apiKey, network }.
// Network format⬇️
// 1: network: "kovan"
// 2: network: { rpcUrl: "http://127.0.0.1:7545", chainId: 1011 }
// 3: network: { rpcUrl: "https://bsc-dataseed.binance.org", chainId: 56 }
const wallet = new Wallet("fortmatic", {
  apiKey: "XXXXXX",
  network: "ropsten" || { rpcUrl: "https://xxx.xx", chainId: 0 },
});

// Portis: { dappId, network, config }.
const wallet = new Wallet("portis", {
  dappId: "YourDappId",
  network: "mainnet", // Can choose other chain.
  config: {
    // Please go to the official view other config.
  },
});

// Waxio: { rpcEndpoint, userAccount, pubKeys, tryAutoLogin }.
const wallet = new Wallet("waxio", {
  rpcEndpoint: "https://wax.greymass.com", // The URL for the RPC Server you wish to connect to (required)
  userAccount: "xxx.wam", // A user’s WAX Blockchain Account name (optional)
  pubKeys: [], // An Array of public keys for a specific account (optional)
  tryAutoLogin: true, // Autologin bool value (optional)
});

// Sollet: { provider, network }.
// provider = window.sollet  (Official Extension Wallet Provider)
// provider = "https://www.sollet.io"  (Official Web Wallet Provider)
const wallet = new Wallet("sollet", {
  provider: window.sollet, // (default)
  // provider: "https://www.sollet.io",
  network: "mainnet-beta" || "devnet" || "testnet", // (required)(default "devnet")
});

// Use try catch
try {
  // The login method is an async function.
  await wallet.login();

  // If the authorized login is successful:👇
  // Whether the specific attribute value exists, please check the notes below👇

  // signer object (instantiated).
  console.log(wallet.signer);

  // Wallet provider.
  console.log(wallet.wallet);

  // Currently authorized account address.
  console.log(wallet.account);

  // User login.
  console.log(wallet.login());

  // User logout.
  console.log(wallet.logout());

  // User change account.
  console.log(wallet.onAccountsChanged());

  // User change chain.
  console.log(wallet.onChainChanged());

  //
} catch (err) {
  // Catch all exception errors here.
  // If the authorization login fails.
  // signer: {}
  // account: ""
}
```

### Methods

```bash
login()
```

```javascript
await wallet.login();
```

```bash
logout()
```

```javascript
await wallet.logout();
```

### Events

```bash
onAccountsChanged(callBack)
```

The wallet monitors account changes.

```javascript
wallet.onAccountsChanged(account => {
  // New account
  console.log(account);
});
```

```bash
onChainChanged(callBack)
```

The wallet monitors network changes.

```javascript
wallet.onChainChanged(chainId => {
  // New network
  console.log(chainId);
});
```

### ❗️❗️Official methods and events support

1⃣️Walletconnect👉 signer✅ login✅ logout✅ onAccountsChanged✅ onChainChanged✅

2⃣️Metamask👉 signer✅ login✅ logout❌ onAccountsChanged✅ onChainChanged✅

3⃣️Portis👉 signer✅ login✅ logout✅ onAccountsChanged✅ onChainChanged❌

4⃣️Walletlink👉 signer✅ login✅ logout✅ onAccountsChanged❌ onChainChanged❌

5⃣️Fortmatic👉 signer✅ login✅ logout✅ onAccountsChanged❌ onChainChanged❌

6⃣️Waxio👉 signer❌ login✅ logout❌ onAccountsChanged❌ onChainChanged❌

7⃣️Phantom👉 signer(@solana/web3.js)✅ login✅ logout✅ onAccountsChanged❌ onChainChanged❌

8⃣️Sollet👉 signer(@solana/web3.js)✅ login✅ logout✅ onAccountsChanged❌ onChainChanged❌

## Supported Wallets & Integrations

1. [Waxio](https://wax.io)
2. [Portis](https://portis.io)
3. [Phantom](https://phantom.app)
4. [Sollet](https://www.sollet.io)
5. [Metamask](https://metamask.io)
6. [Fortmatic](https://fortmatic.com)
7. [Walletlink](https://walletlink.org)
8. [Walletconnect](https://walletconnect.com)
