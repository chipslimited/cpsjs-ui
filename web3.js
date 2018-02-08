var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider("http://testnet1:8080"));
var coinbase = web3.eth.coinbase;
var balance = web3.eth.getBalance(coinbase);
console.log(balance);

var address = "0x8806F129305505a7BE40c6BEDB6B8587Aa92a56c";
var abi=[ { "constant": true, "inputs": [ { "name": "cycle", "type": "uint256" } ], "name": "lockedDeadline", "outputs": [ { "name": "", "type": "uint256", "value": "1517913022" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "name", "outputs": [ { "name": "", "type": "string", "value": "V7SafeCPS" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_spender", "type": "address" }, { "name": "_value", "type": "uint256" } ], "name": "approve", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [ { "name": "", "type": "uint256", "value": "1000000000000000000" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "fundsWallet", "outputs": [ { "name": "", "type": "address", "value": "0x4b14601a4389db52967f61b5e1aed099e49ca647" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_from", "type": "address" }, { "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" } ], "name": "transferFrom", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [ { "name": "", "type": "uint8", "value": "8" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "unitsOneEthCanBuy", "outputs": [ { "name": "", "type": "uint256", "value": "100" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_spender", "type": "address" }, { "name": "_subtractedValue", "type": "uint256" } ], "name": "decreaseApproval", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "_owner", "type": "address" } ], "name": "balanceOf", "outputs": [ { "name": "balance", "type": "uint256", "value": "0" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "totalEthInWei", "outputs": [ { "name": "", "type": "uint256", "value": "0" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [ { "name": "", "type": "string", "value": "V7SafeCPS" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "totalLockAmount", "outputs": [ { "name": "", "type": "uint256", "value": "999999999999999999" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" } ], "name": "transfer", "outputs": [ { "name": "", "type": "bool" } ], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": false, "inputs": [ { "name": "cycle", "type": "uint256" } ], "name": "unlockFund", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" }, { "name": "_data", "type": "bytes" } ], "name": "transfer", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "cycle", "type": "uint256" } ], "name": "lockedAmount", "outputs": [ { "name": "", "type": "uint256", "value": "0" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_spender", "type": "address" }, { "name": "_addedValue", "type": "uint256" } ], "name": "increaseApproval", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "_owner", "type": "address" }, { "name": "_spender", "type": "address" } ], "name": "allowance", "outputs": [ { "name": "", "type": "uint256", "value": "0" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "cycle", "type": "uint256" }, { "name": "numOfSeconds", "type": "uint256" }, { "name": "amount", "type": "uint256" } ], "name": "lockFund", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "name": "name", "type": "string", "index": 0, "typeShort": "string", "bits": "", "displayName": "name", "template": "elements_input_string", "value": "V7SafeCPS" }, { "name": "symbol", "type": "string", "index": 1, "typeShort": "string", "bits": "", "displayName": "symbol", "template": "elements_input_string", "value": "V7SafeCPS" }, { "name": "decimals", "type": "uint8", "index": 2, "typeShort": "uint", "bits": "8", "displayName": "decimals", "template": "elements_input_uint", "value": "8" }, { "name": "totalSupply", "type": "uint256", "index": 3, "typeShort": "uint", "bits": "256", "displayName": "total Supply", "template": "elements_input_uint", "value": "1000000000000000000" } ], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "payable": true, "stateMutability": "payable", "type": "fallback" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "from", "type": "address" }, { "indexed": false, "name": "deadline", "type": "uint256" }, { "indexed": false, "name": "amount", "type": "uint256" } ], "name": "LockFund", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "from", "type": "address" }, { "indexed": false, "name": "deadline", "type": "uint256" }, { "indexed": false, "name": "amount", "type": "uint256" } ], "name": "UnlockFund", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "from", "type": "address" }, { "indexed": true, "name": "to", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" }, { "indexed": true, "name": "data", "type": "bytes" } ], "name": "Transfer", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "from", "type": "address" }, { "indexed": true, "name": "to", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" } ], "name": "Transfer", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "owner", "type": "address" }, { "indexed": true, "name": "spender", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" } ], "name": "Approval", "type": "event" } ];
var account2addr="0x42d7D44A95AcA5B49fCf749007A0e1DAFa4427c3";
var account3addr="0x4b14601A4389DB52967f61b5e1Aed099E49Ca647";
var account4addr="0x013b5DcDc0FA541b63D4F1B784bfA847a3C89ABA";

var Contract = web3.eth.contract(abi);
var contract = Contract.at(address);
console.log(contract.totalSupply());
console.log(contract.balanceOf(account2addr));
console.log(contract.balanceOf(account3addr));
console.log(contract.balanceOf(account4addr));

var events = contract.allEvents({fromBlock: 0, toBlock: 'latest'});
events.get(function(error, logs){ 
    /**
     *
     [ { address: '0x8806f129305505a7be40c6bedb6b8587aa92a56c',
    blockNumber: 7736,
    transactionHash: '0x920914b19feedb4c58829948f27c7726163b70d4498c22de8e8e82335ca34052',
    transactionIndex: 0,
    blockHash: '0x89ae336ecc27a4b8b7a902dea2603b508e9634bb67945b3399c92e7e724cf843',
    logIndex: 0,
    removed: false,
    event: 'LockFund',
    args:
     { from: '0x4b14601a4389db52967f61b5e1aed099e49ca647',
       deadline: [Object],
       amount: [Object] } } ]
     * 
     */
    console.log(logs);
    logs.map(function (event){
        console.log("block:"+event.blockNumber+"\n"+"transactionHash:"+event.transactionHash+
        "\nTransaction:"+event.event+"\nfrom:"+event.args.from);
        if(event.event == "LockFund"){
            console.log("锁定资金 ");
            console.log("deadline="+event.args.deadline);
            console.log("amount="+event.args.amount);
        }
    })
});

var settx = contract.transferFrom(
    "0x4b14601A4389DB52967f61b5e1Aed099E49Ca647","0xc4a68F3583D0B8757E38BaD5D6933F3f8c17252a", 1
)

console.log(settx);