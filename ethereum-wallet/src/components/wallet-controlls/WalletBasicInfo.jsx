import { useState, useEffect } from "react"
import Web3 from "web3";
import { ethers } from "ethers";

const WalletBasicInfo = ({web3,account}) => {

    const[balance, setBalance] = useState(null);
    
    useEffect(() => {
        web3.eth.getBalance(account.address)
         .then(result => {
            setBalance(result);
         });
       },[balance])


    return (
        <div className="container">
        <div className="row">
            <div className="col">
                Address: {account.address}
            </div>
            <div className="col">
                Balance: {balance}
            </div>
        </div>
    </div>
    )

}

export default WalletBasicInfo;