import { useState, useEffect } from "react"
import Web3 from "web3";
import UrlBuilder from "../helpers/UrlBuilder";
import { AES } from "crypto-js";
import { ethers } from "ethers";
import {Wallet} from 'ethers'
import WalletBasicInfo from "./wallet-controlls/WalletBasicInfo";


const WalletManager = ({url,port,encryptedPrivateKey}) => {

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
            const decryptedPriviteKey = AES.decrypt(encryptedPrivateKey, `${password}`).toString();
            const account = new Wallet(decryptedPriviteKey);
            alert(account.address());
        }catch(error) {
            console.log(error);
        }           
   }
    return(
        <div className="container-fluid">
            <form onSubmit={onPassowordSubmit}>
                <div className="row">
                    <label htmlFor={password} className="form-label">Enter Password</label>
                    <input type="password" className="form-control" onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className="row">
                    <input type="submit" value="Submit" className="btn btn-primary" style={{margin:20}}></input>  
                </div>
            </form>
        </div>
    )
}

export default WalletManager;