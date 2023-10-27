import 'dotenv/config'
import { DeployFunction } from 'hardhat-deploy/types'
import contracts from '../../frontend/src/contracts.json'
import ethers, { ContractFactory } from 'ethers'
import bytecode from '../artifacts/src/Main.sol/Main.json'


const deployer: DeployFunction = async hre => {
  if (hre.network.config.chainId !== 31337) return
  const { deployer } = await hre.getNamedAccounts()
  await hre.deployments.deploy('Main', { from: deployer, log: true })

  /* ---------------------------------------------------------------------- */
  /* ---------------Création des collections par le superAdmin-------------- */
  /* ---------------------------------------------------------------------- */


  const {address, abi} = contracts.contracts.Main
  const provider = await hre.ethers.getContractFactory('Main')
  const signer = provider.signer
  try {
    const factory = new ContractFactory(abi, bytecode.bytecode, signer);
    const contract = await factory.deploy();
    await contract.deployed()
    const contract_ 
    
    console.log("ContractMain Collection create OK")
  }catch(error){
    console.error('Erreur lors du déploiement du contrat :', error);

  }


  
}

export default deployer
