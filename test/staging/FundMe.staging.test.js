const { ethers, getNamedAccounts, network } = require("hardhat")
const { developmentChains } = require("../../helper-hardhat-config")
const { assert } = require("chai")

developmentChains.includes(network.name)
    ? describe.skip
    : describe("FundMe", async function () {
          let fundMe
          let deployer
          const sendvalue = ethers.utils.parseEther("0.01")

          beforeEach(async function () {
              deployer = (await getNamedAccounts()).deployer
              fundMe = await ethers.getContract("FundMe", deployer)
              // Assume already deployed
          })

          it("Allows people to fund and withdraw", async function () {
              await fundMe.fund({ value: sendvalue })
              const transactionResponse = await fundMe.cheaperWithdraw({
                  gasLimit: 100000,
              })
              await transactionResponse.wait(1)
              const endingBalance = await fundMe.provider.getBalance(
                  fundMe.address
              )
              assert.equal(endingBalance.toString(), "0")
          })
      })
