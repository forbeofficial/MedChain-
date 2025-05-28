// scripts/deploy.js
const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();
    console.log("Deploying contracts with:", deployer.address);

    // Deploy Verifier contract
    const Verifier = await hre.ethers.getContractFactory("Verifier");
    const verifier = await Verifier.deploy();
    await verifier.waitForDeployment();  // Changed from deployed() to waitForDeployment()
    console.log("Verifier deployed to:", await verifier.getAddress());  // Changed to getAddress()

    //PHR WITH VERIFER ADDRESS.
    const PHR = await hre.ethers.getContractFactory("PHR");
    const phr = await PHR.deploy(await verifier.getAddress());
    await phr.waitForDeployment();
    console.log("PHR deployed to:", await phr.getAddress());
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
