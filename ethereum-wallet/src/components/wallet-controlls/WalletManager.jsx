import { useState, useEffect } from "react"
import Web3 from "web3";
import UrlBuilder from "../../helpers/UrlBuilder";
import {Wallet} from 'ethers'
import WalletBasicInfo from "./WalletBasicInfo";
import { useHistory } from "react-router";

import Constants from "../../storage/Constants";

import CookieHelper from "../../helpers/CookieHelper";
import LocalStorageHelper from "../../storage/LocalStorageHelper";
import CryptographyHelper from "../../helpers/CryptographyHelper";

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
            const pkDecrypted = CryptographyHelper.dencryptPrivateKey(encryptedPrivateKey,password);
            const createdAccount = new Wallet(pkDecrypted);
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
            window.location.href='/'
        }
   }

   const renderOnAccountCreation = () => {
       if(account != null) {
           return(
            <div className="container">
                <div className="row row-cols-2 row-cols-lg-5 g-2 g-lg-3">
                <div className="col">
                    <div className="p-3 border bg-light">
                        <button type="button" className="btn btn-danger" onClick={() => removeWallet(false)}>Delete Wallet</button>
                    </div>
                </div>
                <div className="col">
                    <div className="p-3 border bg-light">
                        <button type="button" className="btn btn-danger" onClick={() => removeWallet(true)}>Delete wallet with data</button>
                    </div>
                </div>
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
                    <input type="submit" value="Submit" className="btn btn-primary"></input>  
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


