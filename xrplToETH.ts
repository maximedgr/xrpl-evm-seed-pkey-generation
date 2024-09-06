import { Mnemonic, ethers } from 'ethers';
import { decodeSeed } from 'ripple-address-codec';

/**
 * Convert an XRPL seed to an Ethereum private key
 * Here we use the XRPL seed as entropy to generate the Ethereum private key.
 * @param seed - The XRPL seed to "convert" (generate)
 * @returns The Ethereum private key
 */
function fromXRPLseedToETHpkey(seed: string): string {
    //verify the XRPL seed is valid
    // decodeSeed returns an object with version, bytes, and type, if the seed is valid otherwise it throws an error
    decodeSeed(seed)
    // Hash the Xseed first
    const hashedSeed = ethers.sha256(ethers.toUtf8Bytes(seed));
    // Convert the hash into a Uint8Array
    const entropy = ethers.getBytes(hashedSeed);
    // get the mnemonic from the entropy
    const mnemonic = Mnemonic.fromEntropy(entropy);
    // compute the seed from the mnemonic
    const ethseed = mnemonic.computeSeed();
    // derive the private key from the seed
    const wallet = ethers.HDNodeWallet.fromSeed(ethseed);

    const privateKey = wallet.privateKey;

    console.log('XRPL seed:', seed);
    console.log('ETH Private key:', privateKey);
    console.log('ETH Public key:', wallet.publicKey);
    console.log('ETH Address:', wallet.address);

    return privateKey;
  }


/**
 * Main function to "convert" (generate) an XRPL seed to (from) an Ethereum private key
 */
function main() {
    const seed = "YOUR_XRPL_SEED";
    fromXRPLseedToETHpkey(seed);
}
  
main();