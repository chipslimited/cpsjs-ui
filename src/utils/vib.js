// NOTE: Need to compile with browserify viz.js -o main.js
var SolidityCoder = require("web3/lib/solidity/coder.js");

var web3 = new Web3(new Web3.providers.HttpProvider(ajaxUrl));

web3.eth.defaultAccount = account;

// Assemble function hashes

var functionHashes = getFunctionHashes(abiArray);

// Get hold of contract instance

var contract = web3.eth.contract(abiArray).at(contractAddress);
var decimals = contract.decimals.call();
var symbol = contract.symbol.call();
console.log("decimals="+decimals+", symbol="+symbol)

// Setup filter to watch transactions

var filter = web3.eth.filter('latest');
var events = contract.allEvents({fromBlock: 0, toBlock: 'latest'});

var padding = function(str){
  str = str+""
  var pad = ""
  for(var i=0;i<decimals;i++){
    pad += "0";
  }
  var ans = pad.substring(0, pad.length - str.length) + str
  return ans;
}

var toRealAmount = function (amount){
  var a = padding(amount);
  return a.slice(0, a.length-decimals)+"."+a.slice(a.length-decimals)+" "+symbol;
}

var callback = function(error, result){
  
  if (error) {
    console.log("error="+JSON.stringify(error));
    return;
  }
  
  var block = result;
  console.log('block ' + JSON.stringify(block));

  $('#label_hash').text(block.hash);
  $('#label1').text(block.number);
  $('#label2').text(new Date(block.timestamp*1000));
  $('#label3').text(block.gasUsed);
  $('#label4').text(block.gasLimit);
  $('#previous_block_href').attr("href","block.html#"+block.parentHash);
  $('#previous_block_href').click(function(){
    location.href="block.html#"+block.parentHash;
    location.reload();
  })
  console.dir(block.transactions);

  for (var index = 0; index < block.transactions.length; index++) {
    var t = block.transactions[index];

    // Decode from
    var from = t.from==account ? symbol+" Owner" : t.from;

    // Decode function
    var func = findFunctionByHash(functionHashes, t.input);

    console.log(JSON.stringify(t));

    if (func == 'lockFund') {
      // This is the sellEnergy() method
      var inputData = SolidityCoder.decodeParams(["uint256","uint256","uint256"], t.input.substring(10));
      console.log(JSON.stringify(inputData));
      var amount = inputData[2].toString();
      $('#transactions').prepend('<tr><td>' + t.blockNumber + 
        '</td><td>' + from + 
        '</td><td>锁定资金 '+ toRealAmount(amount) +""+
        '</td><td>解锁时间:' +inputData[1].toString()+ '秒以后</td></tr>');
    } else if (func == 'transfer') {
      // This is the buyEnergy() method
      var inputData = SolidityCoder.decodeParams(["address","uint256"], t.input.substring(10));
      console.log(inputData);
      var amount = inputData[1].toString();
      $('#transactions').prepend('<tr><td>' + t.blockNumber + 
        '</td><td>' + from + 
        '</td><td>' + inputData[0].toString() + 
        '</td><td>转账金额:' + toRealAmount(inputData[1].toString()) + '</td></tr>');
    } else {
      // Default log
      console.log("func="+func+" t="+JSON.stringify(t));
      $('#transactions').prepend('<tr><td>' + t.blockNumber +", func:["+func+ ']</td><td>' + from + '</td><td>' + t.to + '</td><td>' + t.input + '</td></tr>')
    }
  }
}

/**
 * 
 * {"blockHash":"0x587f11e338a1e8089a03268b36a449491d93e32caca4a25035f58927129e3aff","blockNumber":13371,"from":"0x4b14601a4389db52967f61b5e1aed099e49ca647","gas":140117,"gasPrice":"0","hash":"0xfd76c4a99201e2d13bece7aadfc9fc9c89a924e39525dfd25ceb31af0b7ef77d","input":"0xe70b387500000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000e1000000000000000000000000000000000000000000000000006f05b59d3b20000","nonce":28,"to":"0x8806f129305505a7be40c6bedb6b8587aa92a56c","transactionIndex":0,"value":"0","v":"0x283b934","r":"0xe6a2592d42e45792c0e9598d2e10866df291b884571b8abe0a6c7a8f4aba7474","s":"0x4cdeccb27c68f45d6601d31a953a29770639ce7982b2d015d3337f742f03b467"}
 * 
 */

web3.eth.getBlock(hashParams(location.hash), true, callback);

// Get function hashes
// TODO: also extract input parameter types for later decoding

function getFunctionHashes(abi) {
  var hashes = [];
  for (var i=0; i<abi.length; i++) {
    var item = abi[i];
    if (item.type != "function") continue;
    var signature = item.name + "(" + item.inputs.map(function(input) {return input.type;}).join(",") + ")";
    var hash = web3.sha3(signature);
    console.log(item.name + '=' + hash);
    hashes.push({name: item.name, hash: hash});
  }
  return hashes;
}

function findFunctionByHash(hashes, functionHash) {
  for (var i=0; i<hashes.length; i++) {
    if (hashes[i].hash.substring(0, 10) == functionHash.substring(0, 10))
      return hashes[i].name;
  }
  return null;
}


function hashParams(query) {
  if(/^#/.test(query)) {
      query = query.substring(1)
  }
  
  return query;
}