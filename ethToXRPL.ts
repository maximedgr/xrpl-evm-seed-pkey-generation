import crypto from 'crypto';
import {encodeSeed} from 'ripple-address-codec'
const { Buffer } = require('buffer');
import { isHexString } from 'ethers';

/**
 * Convert an Ethereum private key to an XRPL seed
 * Here we use the first 16 bytes of the hashed private key, as the entropy, to generate the seed of the XRPL account.
 * @param privateKey - The Ethereum private key to "convert" (generate). Should be 64 characters long (32 bytes) and start with 0x
 * @param curve - The curve to use for the generation (default: secp256k1)
 * @returns The XRPL seed
 */
function fromETHpkeyToXRPLseed(privateKey: string, curve: 'secp256k1' | 'ed25519' = 'secp256k1'): string {
  // First verify the private key is valid: 
  if (!isHexString(privateKey, 32)) {
    throw new Error('Invalid Ethereum private key');
  }
  
  // Remove the 0x prefix
  const pkey = privateKey.replace(/^0x/, '');

  // Hash the private key using SHA256
  const hasehdPkey = crypto.createHash('sha256').update(pkey).digest('hex');
  
  // Convert the hashed private key to a buffer
  const buffPK = Buffer.from(hasehdPkey, 'hex');
  
  // Encode the buffer, used as entropy, to an XRPL seed
  const seed = encodeSeed(buffPK.slice(0, 16), curve);
  
  console.log('Curve:', curve);
  console.log('ETH Private key:', privateKey);
  console.log('XRPL Seed:', seed);

  return seed;
}

/**
 * Main function to "convert" an Ethereum private key to an XRPL seed
 */
function main() {
  const privateKey = "YOUR_ETHEREUM_PRIVATE_KEY";
  const curve = "secp256k1"; // or "ed25519"
  fromETHpkeyToXRPLseed(privateKey, curve);
}

main();

