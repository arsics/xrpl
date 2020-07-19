require('dotenv').config();
const client = require('rippled-ws-client');

const XRPL_SERVER = 'wss://fh.xrpl.ws';
const xrplAccount = process.argv[2] || process.env.XRP_ACCOUNT_ADDRESS;

(async () => {
    const xrplConnection = await new client(XRPL_SERVER);
    const accInfo = await xrplConnection.send({
        command: 'account_info',
        account: xrplAccount
    });
    const xrps = parseInt(accInfo.account_data.Balance) / 1000000;
    console.log(`Got answer from node\n`);
    console.log(`\t*** Account balance is ${xrps.toFixed(2)} XRP ***\n\n--------`);
    
    const accTxs = await xrplConnection.send({
        command: 'account_tx',
        account: xrplAccount,
        limit: 10
    });
    xrplConnection.close();
    
    accTxs.transactions.forEach(record => {
        console.log(`Transaction from:  ${record.tx.Account}`);
        console.log(`Transaction type:  ${record.tx.TransactionType}`);

        // If it's a payment, we can show destination and amount
        // If it's not a payment, it may be some other transaction
        // type without a destination or amount (like AccountSet)
        if (record.tx.TransactionType === 'Payment') {
            console.log(`Payment to:\t   ${record.tx.Destination}`);
            let amountStr;
            if (typeof record.tx.Amount === 'string') {
                // If the amount is a string, it's XRP in drops
                const amount = parseInt(record.tx.Amount) / 1000000
                amountStr = amount + ' XRP';
            } else {
                // If the amount is not a string, it may be an IOU
                amountStr = record.tx.Amount;
            }
            console.log(`Amount:\t\t   ${amountStr}`);
        }
        console.log('--------');
    });
})();
