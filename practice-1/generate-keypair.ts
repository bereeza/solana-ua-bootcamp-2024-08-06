import { Keypair } from "@solana/web3.js";

let keypair;
let publicKey;
let attempts = 0;

do {
    keypair = Keypair.generate();
    publicKey = keypair.publicKey.toBase58();
    attempts++;
} while (!publicKey.startsWith("ber"));

console.log(`🔑 The public key is: ${publicKey}`);
console.log(`🔒 The secret key is: `, keypair.secretKey);
console.log(`🔄 Number of attempts: ${attempts}`);
console.log(`✅ Finished!`);
