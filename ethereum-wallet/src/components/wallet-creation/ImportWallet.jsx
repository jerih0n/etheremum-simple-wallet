import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react'
import Constants from '../../storage/Constants';
import { ethers } from 'ethers';
import { Wallet } from '@ethersproject/wallet';
import CookieHelper from "../../helpers/CookieHelper";
import { useHistory } from 'react-router-dom';

const ImportWallet = ({networkConfig,fromMnemonic}) => {
    const history = useHistory();

    const validateMnemonicPhrase = (mnemonicInput) => {
        let isValidMnemonic = ethers.utils.isValidMnemonic(mnemonicInput);
        const mnemonicInputCount = mnemonicInput.split(' ').length;
        return mnemonicInputCount == 12 && isValidMnemonic;
    }

    const validatePassword = (password, confirmedPassword) => {
        return password == confirmedPassword;
    }
    const [recovery, setRecovery] = useState('')

    const [password, setPassword] = useState({
        password:null,
        consfirmPassowrd:null
    });

    const generatePrivateKey = () => {
        const wallet = Wallet.fromMnemonic(recovery);
        const privateKey = wallet.privateKey;
        return privateKey;
    }
    const onFormSubmit = (event) => {
        event.preventDefault();
        let privateKey ="";
        if(fromMnemonic) {
            privateKey = recoverFromMnemonic();
        }else {
            privateKey = recoveFromPrivateKey();
        }
        CookieHelper.setCoockie(Constants.PRIVATE_KEY_COOKIE_NAME,privateKey,new Date(Date.now()+100000000000000))
        return history.push("/")

    }

    const recoverFromMnemonic =() => {
        if(validateMnemonicPhrase(recovery)) {
            if(!validatePassword(password.password, password.consfirmPassowrd)) {
                alert("passwords do not match");
                return history.push("/");
            }           
            const privateKey = generatePrivateKey(recovery);
            return privateKey;
        }
        alert("Invalid Mnemonic")
        
    }

    const recoveFromPrivateKey = () => {
        if(!validatePassword(password.password, password.consfirmPassowrd)) {
            alert("passwords do not match");
            return history.push("/");            
        }    
        let privateKey = recovery.toLowerCase();
        console.log(privateKey);
        if(!privateKey.startsWith('0x')) {
            privateKey = `0x${recovery}`;
        }
        try {
            console.log(privateKey);
            let recoveryWallet = new Wallet(privateKey);
            return recoveryWallet.privateKey;
        }catch(error) {
            alert("Ivalid Private Key")
        }
        
    }
    return(
    <div className="container-fluid">
        <h1>Import Wallet</h1>
        <div>
            <div className="row">
                <form onSubmit={onFormSubmit}>
                    <label className="form-label">{fromMnemonic? "Mnemonic":"Private Key"}</label>
                    <div className="row">
                        <input type="password" className="form-control"  onChange={(e) => setRecovery(e.target.value)}></input>
                    </div> 
                    <label className="form-label">Password</label>
                    <div className="row">
                        <input type="password" className="form-control"  onChange={(e) => setPassword({
                            password: e.target.value,
                            consfirmPassowrd: password.consfimedPassowrd
                        })}></input>
                    </div> 
                    <label className="form-label">Confirm Password</label>
                    <div className="row">
                    <input type="password" className="form-control"  onChange={(e) => setPassword({
                            password: password.password,
                            consfirmPassowrd: e.target.value
                        })}></input>
                    </div>     
                    <input type="submit" value="Submit" className="btn btn-primary" style={{margin:20}}></input>           
                </form>
            </div>
         </div>       
    </div>
    )
}

export default ImportWallet