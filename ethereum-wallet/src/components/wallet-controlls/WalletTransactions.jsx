
import { id } from "@ethersproject/hash";
import { useState, useEffect } from "react"
import Constants from "../../storage/Constants"
import LocalStorageHelper from "../../storage/LocalStorageHelper";


const WalletTransactions = ({account, web3, balance, onBalanceChange}) => {

    const localStorageName = LocalStorageHelper.createLocalStorageKey(Constants.LOCAL_STORAGE_TRANSACTION_HISTORY,account.address)

    const [recieveAddress, setRecieveAddress] = useState(null);
    const [sendAmount, setSendAmount] = useState(null);
    const [transactionHash,setTransactionHash] = useState(null);
    const [transactionEstimatedGass, setEstimatedGassForTrnasaction] = useState(0);
    const [sendAmountInWei,setSendAmountInWei] = useState(null);
    const [allTransactions, setAllTransactions] = useState([]);
    const [showHistory,setShowHistory] = useState();
    

    useEffect(() => {
        const allTransactions = 
        JSON.parse(
            LocalStorageHelper
                .getItemFromLocalStorage(localStorageName));

        setAllTransactions(allTransactions);

    },[transactionHash])

    const transactionSendCallback = (err, transactionHash) => {
        if(err) {
            console.log(err);
        }else {
           recordInLocalStrorage(sendAmountInWei,transactionHash,transactionEstimatedGass)
           setTransactionHash(transactionHash);
           onBalanceChange();
        }
    }
   
    const recordInLocalStrorage = (sendAmountInWei,transactionHash,transactionEstimatedGass) => {
        if(LocalStorageHelper.getItemFromLocalStorage(localStorageName) == null) {
            LocalStorageHelper.addToLocalStorage(localStorageName,[]);
        }

        let newTransactionRecord = {
            from: account.address,
            to: recieveAddress,
            amountInWei: sendAmountInWei,
            transactionHash: transactionHash,
            gass: transactionEstimatedGass
        };

        let currentData = JSON.parse(LocalStorageHelper.getItemFromLocalStorage(localStorageName));
        currentData.push(newTransactionRecord);
        LocalStorageHelper.addToLocalStorage(localStorageName, currentData)    
    }

    const gasEstimationCallback = (error, gass) => {
        if(error) {
            console.log(error);
        }else {
            setEstimatedGassForTrnasaction(gass);
        }
    }

    const renderTransactionHistory = () => {
        if(!showHistory) {
            return (<tbody></tbody>)
        }
        const allTransactions = JSON.parse(LocalStorageHelper.getItemFromLocalStorage(localStorageName));
        if(allTransactions == null || allTransactions.length == 0) {
            return <tbody></tbody>
        }
        const transactions = allTransactions.map((x) => 
        <tr key={x.transactionHash}>
            <td>{x.from}</td>
            <td>{x.to}</td>
            <td>{web3.utils.fromWei(x.amountInWei.toString(),'ether')} ETH</td>
            <td>{web3.utils.fromWei(x.gass.toString(),'ether')} ETH</td>
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
                    <input type="input" className="form-control" placeholder="0xAddress" onChange={(e) => setRecieveAddress(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Amount in EHT</label>
                    <input type="number" class="form-control" onChange={(e) => {
                        setSendAmount(`${e.target.value}`);
                        if(e.target.value != '' && e.target.value != null) {
                            setSendAmountInWei(web3.utils.toWei(e.target.value.toString(),'ether'))
                        }
                    }} />
                </div>
                <div className="mb-3">
                    <input type="submit" class="form-control" id="exampleFormControlInput1"/>
                </div>
            </form>
           </div>
          </div>
        </div>
        <div className="row x-5" style={{marginTop:"3%", marginBottom:"3%"}}>
            <div className="col">
                <button className="btn btn-info" onClick={() =>setShowHistory(!showHistory)}>{showHistory? 'Hide History' : 'Show History'}</button>
            </div>
            
        </div>
        <div className="row">
            <table class="table">
            <thead>
                <tr>
                <th scope="col">Transaction From</th>
                <th scope="col">Transaction To</th>
                <th scope="col">Amount</th>
                <th scope="col">Gass</th>
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