import { useState, useEffect } from "react"
import Web3 from "web3";
import UrlBuilder from "../../helpers/UrlBuilder";
import { AES } from "crypto-js";
import { ethers } from "ethers";
import {Wallet} from 'ethers'
import WalletBasicInfo from "./WalletBasicInfo";
import { useHistory } from "react-router";

import Constants from "../../storage/Constants";

import CookieHelper from "../../helpers/CookieHelper";
import LocalStorageHelper from "../../storage/LocalStorageHelper";

const WalletManager = ({url,port,encryptedPrivateKey}) => {

    const history = useHistory();

    const loadWeb3FromConfig = () => {
        const connection = UrlBuilder.builProviderUrl(url, port);
        const web3 = new Web3(new Web3.providers.HttpProvider(connection));
        return web3;
    }

    const[web3, setWeb3] = useState(loadWeb3FromConfig);
    const[account, setAccount] = useState(null);

    const[password, setPassword] = useState(null)

   const onPassowordSubmit = (event) => {
        event.preventDefault();
        try {
            const createdAccount = new Wallet(encryptedPrivateKey);
            setAccount(createdAccount);
        }catch(error) {
            console.log(error);
        }           
   }
   
   const removeWallet = removeDataAsWell => {
        const dataAsWellDialog = removeDataAsWell ? " This action will removing all the thata as well!": "";
        const alertAnswer = window.confirm(`Are you sure you wan't to remove the wallet?${dataAsWellDialog}`);
        if(alertAnswer) {
            CookieHelper.removeCoockie(Constants.PRIVATE_KEY_COOKIE_NAME);
            if(removeDataAsWell) {
                LocalStorageHelper.removeItemFromStorage(LocalStorageHelper.createLocalStorageKey(Constants.LOCAL_STORAGE_TRANSACTION_HISTORY,account.address));
            }
            return history.push("/");
        }
   }

   const renderOnAccountCreation = () => {
       if(account != null) {
           return(
               <div className="container-fluid">
                   <div className='row'>
                        <button type="button" class="btn btn-danger" onClick={() => removeWallet(false)}>Delete Wallet</button>
                        <button type="button" class="btn btn-danger" onClick={() => removeWallet(true)}>Delete Wallet and Data</button>
                   </div>
                   <WalletBasicInfo web3={web3} account={account}></WalletBasicInfo>
               </div>
           )
       }
       return (
            <form onSubmit={onPassowordSubmit}>
                <div className="row">
                    <label htmlFor={password} className="form-label">Enter Password</label>
                    <input type="password" className="form-control" onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className="row">
                    <input type="submit" value="Submit" className="btn btn-primary" style={{margin:20}}></input>  
                </div>
            </form>
       )
   }
    return(
        <div className="container-fluid">
           {renderOnAccountCreation()}
        </div>
        
    )
}

export default WalletManager;