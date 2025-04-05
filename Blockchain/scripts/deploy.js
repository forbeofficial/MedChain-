const hre=require("hardhat");
async  function main(){
    const PHR=await hre.ethers.getContractFactory("PHR");
    const phr=await PHR.deploy();
    await phr.deployed();
    console.log(phr.address);

}
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
