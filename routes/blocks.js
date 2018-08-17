const Web3 = require('web3');
let web3 = new Web3(Web3.givenProvider || "http://localhost:8545");

const HelloCoin = require('../helloCoin/build/contracts/HelloCoin.json');
var abi = HelloCoin.abi;

let contractAddress;
for (var key in HelloCoin.networks) {
	contractAddress = HelloCoin.networks[key].address
}
var contractInstance = new web3.eth.Contract(abi, contractAddress);

exports.index = async (req, res) => {
	try {
		let name = await contractInstance.methods.name.call().call((error, result) => {
		    return result
		});
		let symbol = await contractInstance.methods.symbol.call().call((error, result) => {
		    return result
		});
		let decimals = await contractInstance.methods.decimals.call().call((error, result) => {
		    return result
		});

		return res.status(200).json({
				name: name,
				symbol: symbol,
				decimals: decimals
			});

	} catch(err) {
		console.error("[error]", err)
		return res.status(500).json({
			error: err.toString()
		});
	}
}