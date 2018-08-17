pragma solidity ^0.4.22;
import "zeppelin-solidity/contracts/token/ERC20/StandardToken.sol";

contract HelloCoin is StandardToken {
  	string public name = "HelloCoin";
  	string public symbol = "H@";
  	uint8 public decimals = 2;
  	uint256 public INITIAL_SUPPLY = 99999;

  	function HelloCoin() public {
    	totalSupply_ = INITIAL_SUPPLY;
    	balances[msg.sender] = INITIAL_SUPPLY;
  	}
}