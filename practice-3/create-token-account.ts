import "dotenv/config";
import { getExplorerLink } from "@solana-developers/helpers";
import {
    Connection,
    Keypair,
    PublicKey,
    clusterApiUrl,
} from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount } from "@solana/spl-token";

let privateKey = process.env["SECRET_KEY"];
if (privateKey === undefined) {
    console.log("Add SECRET_KEY to .env!");
    process.exit(1);
}
const asArray = Uint8Array.from(JSON.parse(privateKey));
const sender = Keypair.fromSecretKey(asArray);

const connection = new Connection(clusterApiUrl("devnet"));

console.log(
    `🔑 Our public key is: ${sender.publicKey.toBase58()}`
);

const tokenMintAccount = new PublicKey("7pDpW1yBFNMbvzWhwQRysLYamDpnpQHNCQ8eJtSdrHFk");
const recipient = new PublicKey("zKWMpYtQuMgXWpAGqYewMBeoidVXPB4C8oJ6FEzWswr");

try {
    const tokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        sender,
        tokenMintAccount,
        recipient
    );

    console.log(`Token Account: ${tokenAccount.address.toBase58()}`);

    const link = getExplorerLink(
        "address",
        tokenAccount.address.toBase58(),
        "devnet"
    );

    console.log(`✅ Created token account: ${link}`);
} catch (error) {
    console.error('Error creating token account:', error);
}
