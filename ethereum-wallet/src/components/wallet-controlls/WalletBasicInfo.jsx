import { useState, useEffect } from "react"
import Web3 from "web3";
import { ethers } from "ethers";
import { Wallet } from "@ethersproject/wallet";
const WalletBasicInfo = ({web3,account}) => {
    const a = () => {
        const wallet = new Wallet();
        wallet.getAddress()
    }
    const[balance, setBalance] = useState(null);
    
    useEffect(() => {
        web3.eth.getBalance(account.address)
         .then(result => {
            setBalance(web3.utils.fromWei(result, 'ether'));
         });
       },[balance])


    return (
        <div className="container">
        <div className="row">
            <div className="col">
                Address: <b>{account.address}</b>
            </div>
            <div className="col">
                Balance: <b>{balance} ETH </b>
            </div>
        </div>
    </div>
    )

}

export default WalletBasicInfo;