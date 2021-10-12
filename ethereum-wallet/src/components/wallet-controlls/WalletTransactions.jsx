import Web3 from "web3"
import { useState, useEffect } from "react"
import { ethers } from "ethers";
import { Wallet } from "@ethersproject/wallet";
import Constants from "../../storage/Constants"


const WalletTransactions = ({account, web3, balance}) => {

    const localStorageHistoryName = Constants.LOCAL_STORAGE_TRANSACTION_HISTORY+`${account.address}`;

    const [recieveAddress, setRecieveAddress] = useState(null);
    const [sendAmount, setSendAmount] = useState(null);
    const [transactionHash,setTransactionHash] = useState(null);
    const [transactionEstimatedGass, setEstimatedGassForTrnasaction] = useState(0);
    const [sendAmountInWei,setSendAmountInWei] = useState(0);
    const [allTransactions, setAllTransactions] = useState([]);

    

    useEffect(() => {
        const allTransactions = JSON.parse(localStorage.getItem(localStorageHistoryName));
        setAllTransactions(allTransactions);
    },[transactionHash])

    const transactionSendCallback = (err, transactionHash) => {
        if(err) {
            console.log(err);
        }else {
           recordInLocalStrorage(sendAmountInWei,transactionHash,transactionEstimatedGass)
           setTransactionHash(transactionHash);
        }
    }

    const recordInLocalStrorage = (sendAmountInWei,transactionHash,transactionEstimatedGass) => {
        if(localStorage.getItem(localStorageHistoryName) == null) {
            localStorage.setItem(localStorageHistoryName,JSON.stringify([]))
        }

        let newTransactionRecord = {
            from: account.address,
            to: recieveAddress,
            amountInWei: sendAmountInWei,
            transactionHash: transactionHash,
            gass: transactionEstimatedGass
        };
        console.log(newTransactionRecord)

        let currentData = JSON.parse(localStorage.getItem(localStorageHistoryName));
        currentData.push(newTransactionRecord);
        localStorage.setItem(localStorageHistoryName,JSON.stringify(currentData));      
    }

    const gasEstimationCallback = (error, gass) => {
        if(error) {
            console.log(error);
        }else {
            setEstimatedGassForTrnasaction(gass);
        }
    }

    const renderTransactionHistory = () => {

        const allTransactions = JSON.parse(localStorage.getItem(localStorageHistoryName));
        const transactions = allTransactions.map((x) => 
        <tr key={x.transactionHash}>
            <td>{x.from}</td>
            <td>{x.to}</td>
            <td>{x.amountInWei}</td>
            <td>{web3.utils.fromWei(x.amountInWei.toString(),'ether')}</td>
            <td>{x.gass}</td>
            <td>{web3.utils.fromWei(x.gass.toString(),'ether')}</td>
            <td>{x.transactionHash}</td>
        </tr>)

        return <tbody>
            {transactions}
        </tbody>
    }
    const onTransactionSubmit = (event) => {
        event.preventDefault();
        // we are assuming that sendAmount is in ethers
        //add dropdown list and handles it 
        
        if(web3.utils.fromWei(balance,'ether') < sendAmount) {
            alert("insufficient balance")
        }

        const weiTransactionAmount = web3.utils.toWei(sendAmount,'ether');

        setSendAmountInWei(weiTransactionAmount);

        const transactionData = {
            from: account.address,
            to: recieveAddress,
            value: weiTransactionAmount
        };

        web3.eth.estimateGas(transactionData,gasEstimationCallback);

        web3.eth.sendTransaction({
            from: account.address,
            to: recieveAddress,
            value: weiTransactionAmount,
        } ,transactionSendCallback)
    }

    return(
        <div className="container-fluid">
        <div className="row gx-5">
          <div className="col">
           <div className="p-3 border bg-light"> 
            <h3>Send amountto address</h3>
            <form onSubmit={onTransactionSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Address</label>
                    <input type="input" className="form-control" id="exampleFormControlInput1" placeholder="0xAddress" onChange={(e) => setRecieveAddress(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Amount in EHT</label>
                    <input type="number"  step="any" class="form-control" id="exampleFormControlInput1" onChange={(e) => {
                        setSendAmount(e.target.value);
                        setSendAmountInWei(web3.utils.toWei(e.target.value.toString(),'ether'))
                    }
                        } />
                </div>
                <div className="mb-3">
                    <input type="submit" class="form-control" id="exampleFormControlInput1"/>
                </div>
            </form>
           </div>
          </div>
        </div>
        <div className="row">
            <table class="table">
            <thead>
                <tr>
                <th scope="col">Transaction From</th>
                <th scope="col">Transaction To</th>
                <th scope="col">Amount in Wei</th>
                <th scope="col">Amount in ETH</th>
                <th scope="col">Gass in Wei</th>
                <th scope="col">Gass in ETH</th>
                <th scope="col">Transaction Hash</th>
                </tr>
            </thead>
                {renderTransactionHistory()}
            </table>
        </div>
      </div>
    )
}

export default WalletTransactions;