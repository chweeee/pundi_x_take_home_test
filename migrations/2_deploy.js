const MyToken = artifacts.require('MyToken');
const MyTokenTimelock = artifacts.require('MyTokenTimelock');
const Executor = artifacts.require('Executor');

module.exports = async function (deployer, network, addresses) {
  const owner = addresses[0]
  const initialSupply = '1000000'

  // deploying token contract
  await deployer.deploy(MyToken);
  const myTokenInstance = await MyToken.deployed();
  myTokenInstance.mint(owner, web3.utils.toWei(initialSupply));

  const oneYearFromNow = new Date();
  oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);
  releaseTime = parseInt((oneYearFromNow.getTime() / 1000).toFixed(0))

  // deploying timelock contract
  await deployer.deploy(
    MyTokenTimelock,
    myTokenInstance.address,
    owner,
    releaseTime
  )
  const myTokenTimelockInstance = await MyTokenTimelock.deployed();

  //deploying Execute contract
  await deployer.deploy(
    Executor,
    myTokenTimelockInstance.address,
    myTokenInstance.address
  )
};
