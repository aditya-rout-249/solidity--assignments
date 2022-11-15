const { expect } = require("chai");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const hre = require("hardhat");
const { string } = require("hardhat/internal/core/params/argumentTypes");

// Initiating and deploying contract and using LoadFixture to pass deployed contract object to other test methods
describe("Token contract", function () {
  async function ietTshirtDeployment() {
    const [owner] = await ethers.getSigners();
    const Token = await hre.ethers.getContractFactory("Token");
    const hardhatToken = await Token.deploy(100, 500);
    await hardhatToken.deployed();

    return { hardhatToken };
  }

  // This Test Determines whether user is able to get thsirts or not
  it(" it should send and reduce tshirt", async function () {
  
    const { hardhatToken } = await loadFixture(ietTshirtDeployment)
    expect(await hardhatToken.sellTshirt(1, { value: 1000 })
    ).to.emit();
    expect(await hardhatToken.getTokens()).to.equal(99);
  });

  // This Checks whether a transactions reverts or not if user provides lower value then cost per tshirt
  it("it should revert error message", async function () {
    const { hardhatToken } = await loadFixture(ietTshirtDeployment)
    await expect(hardhatToken.sellTshirt(5, { value: 2400 })).to.be.revertedWith(
      "Not enough funds for one Tshirt"
    );
  });
});
