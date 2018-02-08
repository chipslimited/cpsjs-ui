// NOTE: Need to compile with browserify viz.js -o main.js
var SolidityCoder = require("web3/lib/solidity/coder.js");
var web3 = new Web3(new Web3.providers.HttpProvider(ajaxUrl));

web3.eth.defaultAccount = account;

// Assemble function hashes

var functionHashes = getFunctionHashes(abiArray);

// Get hold of contract instance

var contract = web3.eth.contract(abiArray).at(contractAddress);
var decimals = contract.decimals.call();//CPS的精度达到了小数点后几位
var symbol = contract.symbol.call();//CPS的符号
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

//CPS的金额都用的是256位整数记录，如100,000,000
//实际显示的时候，需要根据decimals的参数将小数点显示出来，如1.00000000
//即100000000实际上表示的是1CPS
var toRealAmount = function (amount){
  var a = padding(amount);
  return a.slice(0, a.length-decimals)+"."+a.slice(a.length-decimals)+" "+symbol;
}

var callback = function(error, result){
  
  if (error) {
    console.log("error="+JSON.stringify(error));
    return;
  }
  
  var block = web3.eth.getBlock(result, true);
  console.log('block #' + block.number);

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
      $('#transactions').prepend('<tr><td><a href="block.html#'+t.blockNumber+'" target="_blank">' + t.blockNumber + 
        '</a></td><td>' + from + 
        '</td><td>锁定资金 '+ toRealAmount(amount) +""+
        '</td><td>解锁时间:' +inputData[1].toString()+ '秒以后</td></tr>');
    } else if (func == 'transfer') {
      // This is the buyEnergy() method
      var inputData = SolidityCoder.decodeParams(["address","uint256"], t.input.substring(10));
      console.log(inputData);
      var amount = inputData[1].toString();
      $('#transactions').prepend('<tr><td><a href="block.html#'+t.blockNumber+'" target="_blank">' + t.blockNumber + 
        '</a></td><td>' + from + 
        '</td><td>' + inputData[0].toString() + 
        '</td><td>转账金额:' + toRealAmount(inputData[1].toString()) + '</td></tr>');
    } else {
      // Default log
      console.log("func="+func+" t="+JSON.stringify(t));
      $('#transactions').prepend('<tr><td>' + t.blockNumber +", func:["+func+ ']</td><td>' + from + '</td><td>' + t.to + '</td><td>' + t.input + '</td></tr>')
    }
  }
}

//首先获取CPS的历史交易信息
events.get(function(error, logs){
  console.log(JSON.stringify(logs));

  //已经获取了历史交易，现在开始监听新发生的交易
  filter.watch(callback);
  
  for(var i in logs){
    var t = logs[i];

    // Decode from
    var from = t.args.from==account ? symbol+" Owner" : t.args.from;

    // Decode function
    var func = t.event;

    if (func == 'LockFund') {
      $('#transactions').prepend('<tr><td><a href="block.html#'+t.blockNumber+'" target="_blank">' + t.blockNumber + 
        '</a></td><td>' + from + 
        '</td><td>锁定资金 '+ toRealAmount(t.args.amount) +""+
        '</td><td>解锁时间:' + new Date(+(t.args.deadline+"000")) + '</td></tr>');
    } else if (func == 'Transfer') {
      // This is the buyEnergy() method
      $('#transactions').prepend('<tr><td><a href="block.html#'+t.blockNumber+'" target="_blank">' + t.blockNumber + 
        '</a></td><td>' + from + 
        '</td><td>' + t.args.to + 
        '</td><td>转账金额 ' + toRealAmount(t.args.value) + '</td></tr>');
    } else {
      // Default log
      console.log("func="+func+" t="+JSON.stringify(t));
      $('#transactions').prepend('<tr><td>' + t.blockNumber +", func:["+func+ ']</td><td>' + from + '</td><td>' + t.to + '</td><td>' + t.input + '</td></tr>')
    }
  }
})

// Update labels every second
var updateGeneralInfo = function() {

  // Account balance in Ether
  var balanceWei = web3.eth.getBalance(account).toNumber();
  var balance = web3.fromWei(balanceWei, 'ether');
  $('#label1').text(balance);

  // Block number
  var number = web3.eth.blockNumber;
  if ($('#label2').text() != number)
    $('#label2').text(number).effect("highlight");

  // Contract coin balance: call (not state changing)
  var coinBalance = contract.totalSupply.call();
  $('#label3').text(toRealAmount(coinBalance));

  var lockAmount = contract.totalLockAmount();
  $('#label_cir').text(toRealAmount(coinBalance - lockAmount));

};
updateGeneralInfo();
setInterval(updateGeneralInfo, 6000);

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
