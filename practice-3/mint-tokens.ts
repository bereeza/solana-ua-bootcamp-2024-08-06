import "dotenv/config";
import {
    Connection,
    Keypair,
    PublicKey,
    clusterApiUrl,
    Transaction,
    SystemProgram,
    SendTransactionError
} from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount, mintTo } from "@solana/spl-token";

let privateKey = process.env["SECRET_KEY"];
if (privateKey === undefined) {
    console.log("Add SECRET_KEY to .env!");
    process.exit(1);
}
const asArray = Uint8Array.from(JSON.parse(privateKey));
const sender = Keypair.fromSecretKey(asArray);

const connection = new Connection(clusterApiUrl("devnet"));

const tokenMintAccount = new PublicKey("7pDpW1yBFNMbvzWhwQRysLYamDpnpQHNCQ8eJtSdrHFk"); // Змінити на вашу адресу
const recipient = new PublicKey("zKWMpYtQuMgXWpAGqYewMBeoidVXPB4C8oJ6FEzWswr"); // Переконатися в дійсності

(async () => {
    try {
        // Отримати або створити асоційований акаунт
        const tokenAccount = await getOrCreateAssociatedTokenAccount(
            connection,
            sender,
            tokenMintAccount,
            recipient
        );

        // Визначити кількість токенів для випуску
        const amount = 1000; // Змініть на потрібну кількість токенів

        // Випустити токени
        const transaction = await mintTo(
            connection,
            sender,
            tokenMintAccount,
            tokenAccount.address,
            sender,
            amount
        );

        console.log(`Minted tokens to ${tokenAccount.address.toBase58()}`);
    } catch (error) {
        console.error('Error minting tokens:', error);
        if (error instanceof SendTransactionError) {
            console.error('Transaction logs:', error.transactionLogs);
        }
    }
})();
