import { useCallback, useEffect, useState } from "react";
import EthereumValidator from "../../helpers/EthereumValidator";
import Popup from "reactjs-popup";
import ConfirmTransactionPopup from '../Popups/ConfirmTransactionPopup'
import ERC20TokenService from "../../services/ERC20TokenService";
import Web3 from "web3";
import LocalStorageHelper from "../../storage/LocalStorageHelper";
import Constants from "../../storage/Constants";

const SendTokenPopup = ({account, token, decimals, url, balance, sendTokenCallback}) => {
    const localStorageName = LocalStorageHelper.createLocalStorageKey(Constants.LOCAL_STORAGE_TRANSACTION_HISTORY, account.address)
    const erc20TokenService = new ERC20TokenService(url, token.address)
    const web3 = new Web3(new Web3.providers.HttpProvider(url));

    const recordInLocalStrorage = (amount,transactionHash, transactionEstimatedGass, symbol) => {
        if (LocalStorageHelper.getItemFromLocalStorage(localStorageName) == null) {
            LocalStorageHelper.addToLocalStorage(localStorageName, []);
        }

        let newTransactionRecord = {
            from: account.address,
            to: recieveAddress,
            amount: amount,
            transactionHash: transactionHash,
            gass: transactionEstimatedGass,
            symbol:symbol
        };

        let currentData = JSON.parse(LocalStorageHelper.getItemFromLocalStorage(localStorageName));
        currentData.push(newTransactionRecord);
        LocalStorageHelper.addToLocalStorage(localStorageName, currentData)
    }
    const onTransactionConfirmation = (event) => {
        event.preventDefault();
        if(!EthereumValidator.isValidAddress(recieveAddress)) {
            alert('Invalid Address!');
            sendTokenCallback(false);
            return;
        }
        if(balance < amount) {
            alert('insufficient balance!')
            sendTokenCallback(false);
            return;
        }

        erc20TokenService.transfer(recieveAddress, amount, account.address)
        .then(success => {
            console.log('resposne is :')
            console.log(success);
            if(success && success.status == true) {
                recordInLocalStrorage(amount,success.transactionHash,gassPrice, token.symbol);
                sendTokenCallback(true);
            }     
        }).catch(e => console.log(e));
        
        sendTokenCallback(false);
    }

    useEffect(() => {
        web3.eth.getGasPrice().then(g => {
            setGassPrice(web3.utils.fromWei(g.toString(), 'ether'));
        }).catch(e => console.log(e));
    },[])

 

    const[recieveAddress, setRecieveAddress] = useState(null);
    const[amount, setAmount] = useState(null);
    const[gassPrice, setGassPrice] = useState(0);

    return(
        <div id={`token-transaction-${token.name}`}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Send {token.name}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => sendTokenCallback(false)}></button>
                </div>
                <div className="modal-body" style={{fontSize:"18px"}}>
                    <form>
                    <form >
                            <div className="mb-3">
                                <label className="form-label">Address</label>
                                <input type="input" className="form-control" placeholder="0xAddress" onChange={(e) => setRecieveAddress(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleFormControlInput1" className="form-label">{token.name} Amount</label>
                                <input type="number" class="form-control" onChange={(e) => {
                                    if (e.target.value != '' && e.target.value != null) {
                                        setAmount(e.target.value * decimals);
                                    }
                                }} />
                            </div>
                            <div className="mb-3">
                                Estimated Gass: {gassPrice} ETH
                            </div> 
                            <div className="mb-3">
                                <input type="button" class="form-control btn btn btn-warning" value='Send' onClick={onTransactionConfirmation}/>
                               {/*  { <Popup trigger={<input type="button" class="form-control btn btn btn-warning" value='Send'/>} position='top center'>
                                    <ConfirmTransactionPopup address={recieveAddress}
                                        amount={amount}
                                        gassPrice={gassPrice}
                                        confirmationCallback={onTransactionConfirmation}
                                        symbol={token.symbol}></ConfirmTransactionPopup>
                                </Popup> } */}

                            </div>
                        </form>
                    </form>
                </div>
            </div>
        </div>
    </div>
    )
}
export default SendTokenPopup;

