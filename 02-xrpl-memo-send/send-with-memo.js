require('dotenv').config();
const rippledWsClient = require('rippled-ws-client');
const rippledWsClientSign = require('rippled-ws-client-sign');

const xrplServer = 'wss://s1.ripple.com';
const xrpSeed = process.env.XRP_SENDER_KEY; // The secret of the sending wallet
const xrplSenderAddress = process.env.XRP_SENDER_ADDRESS;
const xrpAmount = Math.round(Number(process.argv[2]) * 1000000); // convert from XRP to drops
const destination = process.argv[3] || process.env.XRP_RECEIVER_ADDRESS;

if (Number.isNaN(xrpAmount)) {
  console.log(`Usage: 'node send-with-memo.js <xrpAmount> [destination]'`);
  process.exit(0);
}

const transaction = {
  TransactionType: 'Payment',
  Account: xrplSenderAddress,
  Destination: destination,
  Amount: xrpAmount,
  Fee: 10,
  Memos: [
    {
      Memo: {
        MemoType: Buffer.from('TestMemo', 'utf8').toString('hex').toUpperCase(),
        MemoData: Buffer.from('Hello there!', 'utf8').toString('hex').toUpperCase()
      }
    },
    {
      Memo: {
        MemoType: Buffer.from('Sender', 'utf8').toString('hex').toUpperCase(),
        MemoData: Buffer.from('Obi-Wan', 'utf8').toString('hex').toUpperCase()
      }
    }
  ]
};

(async () => {
  const connection = await new rippledWsClient(xrplServer);
  try {
    const signedTx = await new rippledWsClientSign(transaction, xrpSeed, connection);
    console.log(`TransactionSuccess: ${JSON.stringify(signedTx)}`);
  } catch (err) {
    console.log(`SignError`, err);
  }
  connection.close();
})();
