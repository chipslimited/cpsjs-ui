/**
 *
 * eos_example.js 演示了通过web3.js库获取代币EOS交易历史
 * 使用方法，在命令行运行node eos_example.js
 *
 *
 */

var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider("http://47.254.24.199:8080"));
var coinbase = web3.eth.coinbase;
var balance = web3.eth.getBalance(coinbase);
console.log("Balance of "+coinbase+":"+balance);

var address = "0x86fa049857e0209aa7d9e616f7eb3b3b78ecfdb0";//EOS contract address
var abi=[{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"bytes32"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"stop","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"guy","type":"address"},{"name":"wad","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"owner_","type":"address"}],"name":"setOwner","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"src","type":"address"},{"name":"dst","type":"address"},{"name":"wad","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"dst","type":"address"},{"name":"wad","type":"uint128"}],"name":"push","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"name_","type":"bytes32"}],"name":"setName","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"wad","type":"uint128"}],"name":"mint","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"src","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"stopped","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"authority_","type":"address"}],"name":"setAuthority","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"src","type":"address"},{"name":"wad","type":"uint128"}],"name":"pull","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"wad","type":"uint128"}],"name":"burn","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"bytes32"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"dst","type":"address"},{"name":"wad","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"start","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"authority","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"src","type":"address"},{"name":"guy","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"inputs":[{"name":"symbol_","type":"bytes32"}],"payable":false,"type":"constructor"},{"anonymous":true,"inputs":[{"indexed":true,"name":"sig","type":"bytes4"},{"indexed":true,"name":"guy","type":"address"},{"indexed":true,"name":"foo","type":"bytes32"},{"indexed":true,"name":"bar","type":"bytes32"},{"indexed":false,"name":"wad","type":"uint256"},{"indexed":false,"name":"fax","type":"bytes"}],"name":"LogNote","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"authority","type":"address"}],"name":"LogSetAuthority","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"}],"name":"LogSetOwner","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"}]

var account2addr="0xdd7348e95c3237147abdaca819ffd0402cc463b4";

var Contract = web3.eth.contract(abi);
var contract = Contract.at(address);
console.log("Total Supply:"+contract.totalSupply());
console.log("Decimals:"+contract.decimals());
console.log("Balance of "+account2addr+":"+contract.balanceOf(account2addr));

var events = contract.allEvents({fromBlock: 5121000, toBlock: 'latest'});
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
        "\nTransaction:"+event.event+"\n");
        if(event.event == "Transfer"){
          console.log("转账 ");
          console.log("from:"+event.args.from);
          console.log("to="+event.args.to);
          console.log("amount="+event.args.value);
        }
        console.log("\n");
    })
});
