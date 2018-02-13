# About

General purpose web interface for the CPS blockchain.

Status: Alpha (for developers)

# Configuration

See [npm/config](http://npmjs.com/package/config) and [./config](./config).

In summary, the kyt environment automatically sets NODE_ENV to `development`
(in `npm run dev`).  For local customizations, you can copy [./config/development.json](./config/development.json)
to a new name (like ./config/myconfig.json) set NODE_ENV=myconfig.

# 本地调试

```bash
npm install
browserify src/utils/vib.js -o src/public/block.js && browserify src/utils/viz.js -o src/public/main.js
npm run dev
```

# ERC20的区块链浏览器API web3.js

例子参考src/utils/viz.js和src/utils/vib.js

viz.js获取token对应的CPS合约的交易记录并展示出来

vib.js根据block hash和block number获取以太坊的区块信息，并筛选CPS的交易显示出来。

src/public/abi.js 为CPS智能合约的ABI信息

src/public/common.js 存储了CPS智能合约对应的合约地址、合约创建人地址以及以太坊JSON-RPC地址。

实际上线的时候，需要将abi.js和common.js中的参数修改为对应的真实环境的参数

viz.js和vib.js已经实现了以下功能

根据block hash还活着block number获取区块信息

从区块信息中筛选出CPS智能合约对应的交易并解析出交易的具体详情

监听CPS智能合约的交易事件，新的交易发生的时候，立即在界面中显示出来

* 初始化web3对象
```javascript
//ajaxUrl, abiArray, account都在common.js中定义了
//ajaxUrl是运行了以太坊全节点并且开启了json-rpc服务的服务器的地址
//abiArray参考abi.js
//account为创建CPS智能合约的以太坊账户地址
//functionHashes用于从区块的交易记录中筛选出CPS相关的交易
var SolidityCoder = require("web3/lib/solidity/coder.js");
var web3 = new Web3(new Web3.providers.HttpProvider(ajaxUrl));
web3.eth.defaultAccount = account;
// Assemble function hashes
var functionHashes = getFunctionHashes(abiArray);
```
* 获取CPS token的基本信息
```javascript
var decimals = contract.decimals.call();//CPS的精度达到了小数点后几位
var symbol = contract.symbol.call();//CPS的符号
var cpsTotalSupply = contract.totalSupply.call();//CPS的总量上限
```
* 根据block hash或者block number获取block对象
```javascript
var block = web3.eth.getBlock(result, true);//result为block hash或者block number
````
* 筛选区块中CPS的有关交易
```javascript
for (var index = 0; index < block.transactions.length; index++) {
    var t = block.transactions[index];
    var func = findFunctionByHash(functionHashes, t.input);
    if (func == 'lockFund') {
        //锁定资金操作，如30%总量3年不动用
        var inputData = SolidityCoder.decodeParams(["uint256","uint256","uint256"], t.input.substring(10));
        console.log(JSON.stringify(inputData));
        var amount = inputData[2].toString();//锁定的金额
        var index = inputData[0];//锁定的周期，第一期，第二期
        var timeout = inputData[1];//锁定时间，即从block的timestamp算起，多少秒以后解锁
    }
    else if (func == 'transfer') {
        //转账操作
        var from = t.from;
        //transfer操作有两个参数，第一个参数是收款人地址，第二个为转账金额，需要注意的是
        //100000000 = 1 CPS
        var inputData = SolidityCoder.decodeParams(["address","uint256"], t.input.substring(10);
        var amount = inputData[1].toString();
        var to = inputData[0].toString();
    }
}
```

# 部署参考

* 假设有一台nginx服务器，运行在 www.cpscoin.org 上，提供了 http://www.cpscoin.org/ 的服务，
* 且nginx在服务器上的页面位置是/var/www/html/
* 假设以太坊的geth全节点运行在172.16.1.5上，并且在8080端口开放了json-rpc服务
* 将json-rpc api映射到 http://www.cpscoin.org/eth/jsonrpc

现在需要将cpsjs-ui部署到 http://www.cpscoin.org/dashboard/ 上，并且配置好以太坊json-rpc转发

* json-rpc配置
在nginx上进行配置，将 http://www.cpscoin.org/eth/jsonrpc 的所有POST请求转发到 http://172.16.1.5:8080/

* 生成目录

```bash
mkdir -p /var/www/html/dashboard/
```

* 修改cpsjs-ui配置信息

修改src/public/common.js，将
```javascript
var ajaxUrl = "http://localhost:3000";
```
修改为
```javascript
var ajaxUrl = "http://www.cpscoin.org/eth/jsonrpc";
```

* 编译
```bash
browserify src/utils/vib.js -o src/public/block.js && browserify src/utils/viz.js -o src/public/main.js
```
* 将src/public下的所有内容部署到nginx上

将src/public下的所有文件复制到nginx服务器上的/var/www/html/dashboard/

* 配置
```

# Environment

Node.js 8+ and browserify 
