var HelloCoin = artifacts.require('HelloCoin');

const INITIAL_SUPPLY = 99999;

contract('HelloCoin Async', function(accounts) {
	it('should have right balance after transfer', async function() {
    	const AMOUNT = 123;
    	let contract = await HelloCoin.deployed();
    	// check init balance
    	let account0Balance = await contract.balanceOf(accounts[0]);
    	let account1Balance = await contract.balanceOf(accounts[1]);
    	assert.equal(account0Balance.toNumber(), INITIAL_SUPPLY);
    	assert.equal(account1Balance.toNumber(), 0);
    	// check balance after transferred
    	await contract.transfer(accounts[1], AMOUNT);
    	account0Balance = await contract.balanceOf(accounts[0]);
    	account1Balance = await contract.balanceOf(accounts[1]);
    	assert.equal(account0Balance.toNumber(), INITIAL_SUPPLY - AMOUNT);
    	assert.equal(account1Balance.toNumber(), AMOUNT);
  	});
});
