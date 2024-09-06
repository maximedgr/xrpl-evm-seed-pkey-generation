# Ethereum Private Key <--to--> XRPL Seed

## Description

This tool allows you to generate an XRPL account (seed) from an Ethereum private key and vice versa. 
It is not possible to regenerate the original Ethereum private key from a generated XRPL seed, or vice versa: the 'conversion' (generation would be the correct term) process involves hashing the initial parameter, making it a one-way operation for security purposes. 

## Disclaimer

🚨 This is an experimental project, use at your own risk.

1. ETH Private Key --> XRPL Seed  

- If your Ethereum private key is compromised, so is your XRPL account because the XRPL seed is generated from the Ethereum private key in a deterministic way.
- If your XRPL account is compromised, your Ethereum account should be safe due to the hashing occuring in the generation process.

2. XRPL Seed --> ETH Private Key  

- If your XRPL seed is compromised, so is your Ethereum account because the Ethereum seed is generated from the XRPL private key in a deterministic way.
- If your Ethereum account is compromised, your XRPL account should be safe due to the hashing occuring in the generation process.

## Installation

To install the project dependencies, run:

```bash
npm install
```

## Usage

### ETH Private Key --> XRPL Seed

Modify the `privateKey` and the `curve` variable in the `ethToXRPL.ts` file to your Ethereum private key and curve.
The `curve` variable can be `secp256k1` (default) or `ed25519`, those are the two curves supported by the XRPL.

```typescript
const privateKey = "YOUR_ETHEREUM_PRIVATE_KEY";
const curve = "secp256k1";// or 'ed25519'
```

```bash
npm run start-1
```  

Now you can use the XRPL seed directly in your XRPL wallet such as [CrossMark](https://crossmark.io/), [Xumm](https://xumm.app/) or [GemWallet](https://gemwallet.app/) by pasting it in the "Import Account" section.

### XRPL Seed --> ETH Private Key

Modify the `seed` variable in the `xrplToETH.ts` file to your XRPL seed.

```typescript
const seed = "YOUR_XRPL_SEED";
```

```bash
npm run start-2
```

Now you can use the ETH private key in your Ethereum wallet such as [MetaMask](https://metamask.io/) by pasting it in the "Import Account" section.

## Dependencies

This project relies on the following main dependencies:

- `ethers`: For Ethereum-related utilities
- `ripple-address-codec`: For XRPL-specific encoding

### ripple-address-codec

We specifically use the `encodeSeed` function from `ripple-address-codec` to encode the derived entropy into an XRPL seed. This function takes a byte array of entropy and the curve type as inputs and returns the encoded XRPL seed.
Feel free to explore this library and its other functions.

## Resources

- [xrpl.org](https://xrpl.org/)
- [DOC: Cryptographic Keys on the XRP Ledger](https://xrpl.org/docs/concepts/accounts/cryptographic-keys)
- [xrpl-address-codec](https://github.com/ripple/ripple-address-codec)
- [ethers](https://github.com/ethers-io/ethers.js/)

## Shoutouts

Built with [@Elli610](https://github.com/Elli610), thank you for your contribution to the XRPL community!

## Contributing

Contributions are welcome! This is a try and we are sure there are better ways to do this so feel free to open an issue or a PR ❤️