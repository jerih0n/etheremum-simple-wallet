import { useState, useEffect } from "react"
import Web3 from "web3";
import UrlBuilder from "../helpers/UrlBuilder";
const WalletManager = ({url,port,encryptedPrivateKey}) => {

    const loadWeb3FromConfig = () => {
        const connection = UrlBuilder.builProviderUrl(url, port);
        const web3 = new Web3(new Web3.providers.HttpProvider(connection));
        return web3;
    }
    const loadAccountByPrivateKey = () => {       
        const account = web3.eth.accounts.privateKeyToAccount(encryptedPrivateKey);
        return account;
    }

    const[web3, setWeb3] = useState(loadWeb3FromConfig);
    const[account, setAccount] = useState(loadAccountByPrivateKey);
    const[balance, setBalance] = useState(null);

   useEffect(() => {
    web3.eth.getBalance(account.address)
     .then(result => {
        setBalance(result);
     });
   },[balance])
    return(
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

export default WalletManager;