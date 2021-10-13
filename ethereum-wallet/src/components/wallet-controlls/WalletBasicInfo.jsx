import { useState, useEffect } from "react"
import Web3 from "web3";
import { ethers } from "ethers";
import { Wallet } from "@ethersproject/wallet";
import WalletTransactions from './WalletTransactions';

const WalletBasicInfo = ({web3,account}) => {

    const[balance, setBalance] = useState(0);
    
    useEffect(() => {
        web3.eth.getBalance(account.address)
         .then(result => {
            setBalance(result);
         });
       },[])

    const balanceChangeHandler = () => {
        web3.eth.getBalance(account.address)
         .then(result => {
            setBalance(result);
         });
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    Address: <b>{account.address}</b>
                </div>
                <div className="col">
                    Balance: <b>{web3.utils.fromWei(balance.toString(), 'ether')} ETH </b>
                </div>
            </div>
            <div className="row" style={{"margin-top":"7%"}}>
                <WalletTransactions account={account} web3={web3} balance={balance} onBalanceChange={() =>balanceChangeHandler()}></WalletTransactions>
            </div>
    </div>
    )

}

export default WalletBasicInfo;