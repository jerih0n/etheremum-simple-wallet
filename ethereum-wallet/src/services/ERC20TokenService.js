
import Web3 from "web3";
import UrlBuilder from '../helpers/UrlBuilder'
import SmartContractABIStorage from '../storage/SmartContractABIStorage'
class ERC20TokenService {

    web3;
    contract;
    createWeb3Instance(url) {
        const web3 = new Web3(new Web3.providers.HttpProvider(url));
        return web3;
    }

    constructor(rpcEthereumUrl, address) {
        this.web3 = this.createWeb3Instance(rpcEthereumUrl)
        this.contract = new this.web3.eth.Contract(SmartContractABIStorage.generalERC20TokenABI, address);

        console.log('created with address ' + address)
    }
    
    getSimbol() {
        
        return this.contract.methods.symbol().call(); 
    }

    getName() {

        return this.contract.methods.name().call()
    }

}

export default ERC20TokenService;