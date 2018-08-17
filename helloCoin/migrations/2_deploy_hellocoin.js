var HelloCoin = artifacts.require("HelloCoin");

module.exports = function(deployer) {
  	deployer.deploy(HelloCoin) 
  		.then(() => console.log("[HelloCoin Address]:", HelloCoin.address))
    	.then(() => HelloCoin.deployed())
    	.then(_instance => console.log("[HelloCoin Instance Address]:", _instance.address));;
};