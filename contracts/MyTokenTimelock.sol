// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/TokenTimelock.sol";

contract MyTokenTimelock is TokenTimelock {
    constructor (
      address token,
      address beneficiary,
      uint256 releaseTime
    ) public TokenTimelock(IERC20(token), beneficiary, releaseTime) {
    }
}
