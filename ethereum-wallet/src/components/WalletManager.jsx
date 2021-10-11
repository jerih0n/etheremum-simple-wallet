import { useState, useEffect } from "react"
import Web3 from "web3";

const WalletManager = (networkConfiguration, encryptedPrivateKey) => {

    const[privateKey, setPrivateKey] = useState(null);
    useEffect(() => {
        setPrivateKey(encryptedPrivateKey);
    },[privateKey])

    
}

export default WalletManager;