require("dotenv").config()

require("@nomiclabs/hardhat-etherscan")
require("@nomiclabs/hardhat-waffle")
require("hardhat-gas-reporter")
require("solidity-coverage")
require("hardhat-deploy")

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
    const accounts = await hre.ethers.getSigners()

    for (const account of accounts) {
        console.log(account.address)
    }
})

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

const RINKEBY_RPC_URL =
    process.env.RINKEBY_RPC_URL || "https://eth-rinkeby/example"
const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL || "https://goerli"
const POLYGON_MUMBAI_RPC_URL =
    process.env.POLYGON_MUMBAI_RPC_URL || "https://mumbai"
const LOCALHOST_RPC_URL = process.env.LOCALHOST_RPC_URL || "https://127.0.0.1"
const PRIVATE_KEY = process.env.METAMASK_PRIVATE_KEY || "0xkey"
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "key"
const POLYGONSCAN_API_KEY = process.env.POLYGONSCAN_API_KEY || "key"
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || "key"

module.exports = {
    solidity: {
        compilers: [{ version: "0.8.8" }, { version: "0.6.6" }],
    },
    networks: {
        localhost: {
            url: LOCALHOST_RPC_URL,
            chainId: 31337,
        },
        rinkeby: {
            url: RINKEBY_RPC_URL,
            accounts: [PRIVATE_KEY],
            chainId: 4,
            blockConfirmations: 3,
        },
        goerli: {
            url: GOERLI_RPC_URL,
            accounts: [PRIVATE_KEY],
            chainId: 5,
        },
        ropsten: {
            url: process.env.ROPSTEN_URL || "",
            accounts:
                process.env.PRIVATE_KEY !== undefined
                    ? [process.env.PRIVATE_KEY]
                    : [],
        },
        polygonMumbai: {
            url: POLYGON_MUMBAI_RPC_URL,
            accounts: [PRIVATE_KEY],
            chainId: 80001,
            blockConfirmations: 20,
        },
    },
    etherscan: {
        apiKey: {
            mainnet: ETHERSCAN_API_KEY,
            rinkeby: ETHERSCAN_API_KEY,
            goerli: ETHERSCAN_API_KEY,
            kovan: ETHERSCAN_API_KEY,
            polygonMumbai: POLYGONSCAN_API_KEY,
        },
    },
    gasReporter: {
        enabled: false,
        outputFile: "gas-report.txt",
        noColors: true,
        currency: "USD",
        coinmarketcap: COINMARKETCAP_API_KEY,
        token: "ETH",
    },
    namedAccounts: {
        deployer: {
            default: 0,
        },
        user: {
            default: 0,
        },
    },
}
