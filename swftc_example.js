/**
 *
 * swftc_example.js 演示了通过web3.js库获取代币SWFTC交易历史
 * 使用方法，在命令行运行node swftc_example.js
 *
 *
 */

var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider("http://47.254.24.199:8080"));
var coinbase = web3.eth.coinbase;
var balance = web3.eth.getBalance(coinbase);
console.log("Balance of "+coinbase+":"+balance);

var address = "0x0bb217E40F8a5Cb79Adf04E1aAb60E5abd0dfC1e";//SWFTC contract address
var abi=[{"constant":false,"inputs":[{"name":"newSellPrice","type":"uint256"},{"name":"newBuyPrice","type":"uint256"}],"name":"setPrices","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"sellPrice","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"standard","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"target","type":"address"},{"name":"mintedAmount","type":"uint256"}],"name":"mintToken","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"buyPrice","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"buy","outputs":[],"payable":true,"type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"frozenAccount","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"},{"name":"_extraData","type":"bytes"}],"name":"approveAndCall","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"sell","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"target","type":"address"},{"name":"freeze","type":"bool"}],"name":"freezeAccount","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"type":"function"},{"inputs":[{"name":"initialSupply","type":"uint256"},{"name":"tokenName","type":"string"},{"name":"decimalUnits","type":"uint8"},{"name":"tokenSymbol","type":"string"}],"payable":false,"type":"constructor"},{"payable":false,"type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"name":"target","type":"address"},{"indexed":false,"name":"frozen","type":"bool"}],"name":"FrozenFunds","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"}]

var account2addr="0xdd7348e95c3237147abdaca819ffd0402cc463b4";

var Contract = web3.eth.contract(abi);
var contract = Contract.at(address);
console.log("Total Supply:"+contract.totalSupply());
console.log("Decimals:"+contract.decimals());
console.log("Balance of "+account2addr+":"+contract.balanceOf(account2addr));

var events = contract.allEvents({fromBlock: 4118404, toBlock: 'latest'});
//获取所有SWFTC相关的历史交易，并打印出来
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
        if(event.event == "FrozenFunds"){
            console.log("锁定资金 ");
            console.log("target="+event.args.target);
            console.log("freeze="+event.args.freeze);
        }
        if(event.event == "Transfer"){
            console.log("转账 ");
            console.log("to="+event.args.to);
            console.log("amount="+event.args.value);
        }
        console.log("\n");
    })
});
