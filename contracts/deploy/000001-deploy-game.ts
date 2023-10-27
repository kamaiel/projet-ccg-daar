import 'dotenv/config'
import { DeployFunction } from 'hardhat-deploy/types'
import {contracts} from '../../frontend/src/contracts.json'
import ethers, { ContractFactory } from 'ethers'
import bytecode from '../artifacts/src/Main.sol/Main.json'
import type { Main } from '$/Main'
import metaDataSet from '../../frontend/src/metaDataSet.json'



const deployer: DeployFunction = async hre => {
  if (hre.network.config.chainId !== 31337) return
  const { deployer } = await hre.getNamedAccounts()
  await hre.deployments.deploy('Main', { from: deployer, log: true })

  /* ---------------------------------------------------------------------- */
  /* ---------------Création des collections par le superAdmin-------------- */
  /* ---------------------------------------------------------------------- */

  const {address, abi} = contracts.Main
  const provider = hre.ethers.provider
  const signer = provider.getSigner()
  try {
    const contract = new hre.ethers.Contract("0x5FbDB2315678afecb367f032d93F642f64180aa3", abi, provider)
    await contract.deployed()
    const contract_ = signer ? contract.connect(signer) : contract
    const contractMain = contract_ as any as Main

    console.log("ContractMain deployed with success", contractMain.address)
    for(var i = 0 ; i < 6 ; i ++){
      contractMain.createCollection(metaDataSet.data[i].name, Number(metaDataSet.data[i].total))
    }
  
  }catch(error){
    console.error('Erreur lors du déploiement du contrat et de la créations des collections de base par le superAdmin :', error);

  }
}

export default deployer
