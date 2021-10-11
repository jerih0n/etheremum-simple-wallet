import { useState, useEffect } from "react"
import Web3 from "web3";
import UrlBuilder from "../helpers/UrlBuilder";
const WalletManager = ({url,port,encryptedPrivateKey}) => {

    const loadAccountByPrivateKey = () => {
        console.log("this is asdasd " + encryptedPrivateKey);
        const connection = UrlBuilder.builProviderUrl(url, port);
        const web3 = new Web3(new Web3.providers.HttpProvider(connection));
        const account = web3.eth.accounts.privateKeyToAccount(encryptedPrivateKey);
        return account;
    }

    const[account, setAccount] = useState(loadAccountByPrivateKey);

    

    return(
        <div>
            Address - {account.address}
        </div>
    )

}

export default WalletManager;