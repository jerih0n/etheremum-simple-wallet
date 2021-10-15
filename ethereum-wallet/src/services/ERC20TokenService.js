
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

        return this.contract.methods.name().call();
    }

    getDecimals(callerAddress) {
        return this.contract.methods.decimals().call();
    }

    getTotalSupply(callerAddress) {
        return this.contract.methods.totalSupply().call();
    }

    getBalance(callerAddress) {
        return this.contract.methods.balanceOf(callerAddress).call()
    }

    transfer(toAddress, amount, callerAddress) {
        return this.contract.methods.transfer(toAddress, amount).send({from: callerAddress});
    }

    transferFrom(fromAddress, toAddress, amount, callerAddress) {
        return this.contract.methods.transferFrom(fromAddress, toAddress, amount).send({from: callerAddress});
    }

    approve(spender, value, callerAddress) {
        return this.contract.methods.approve(spender, value).send({from: callerAddress});
    }

    allowance(owner, spender, callerAddress) {
        return this.contract.methods.allowance(owner, spender).send({from: callerAddress})
    }
}

export default ERC20TokenService;