const {expect} = require("chai");
const hre = require("hardhat");
const { time } = require("@nomicfoundation/hardhat-network-helpers");

describe("Lock", function(){
    it("Should set the right unlockTime", async function(){
        const lockedAmount = 1_000_000_000;
        const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
        const unlockTime = (await time.latest()) + ONE_YEAR_IN_SECS;

        const Lock = await hre.ethers.getContractFactory("Lock");
        const lock = await Lock.deploy(unlockTime, {value:lockedAmount});

        expect(await lock.unlockTime()).to.equal(unlockTime);
    });

    it("Sould revert with the right error if called too soon", async function() {
        const lockedAmount = 1_000_000_000;
        const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
        const unlockTime = (await time.latest()) + ONE_YEAR_IN_SECS;

        const Lock = await hre.ethers.getContractFactory("Lock");
        const lock = await Lock.deploy(unlockTime, {value:lockedAmount});

        await expect(lock.withdraw()).to.be.revertedWith("You can't withdraw yet");
    });
});