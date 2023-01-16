// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.17;

import "hardhat/console.sol";

contract WavePortal {
    uint256 totalWaves;
    mapping ( address => uint256 ) sender_waves;

    constructor() {
        console.log("Yo yo, I am a contract and I am smart");
    }

    function wave() public{
        totalWaves += 1;
        sender_waves[msg.sender] = sender_waves[msg.sender] + 1;
        console.log("%s has waved!", msg.sender);
    }

    function getTotalWaves() public view returns (uint256) {
        console.log("We have %d total waves!", totalWaves);
        console.log("You waves %d !", sender_waves[msg.sender]);
        return totalWaves;
    }
}