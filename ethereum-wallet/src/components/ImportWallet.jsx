import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react'
import Cookies from 'universal-cookie';
import Constants from '../storage/Constants';
import { AES } from 'crypto-js';
import Web3 from 'web3';
import UrlBuilder from '../helpers/UrlBuilder';
import { ethers } from 'ethers';
import { Wallet } from '@ethersproject/wallet';
import CookieHelper from "../helpers/CookieHelper";
import { Redirect, Route } from 'react-router';
import Main from "../components/Main"

const ImportWallet = ({networkConfig}) => {

    const validateMnemonicPhrase = (mnemonicInput) => {
        let isValidMnemonic = ethers.utils.isValidMnemonic(mnemonicInput);
        const mnemonicInputCount = mnemonicInput.split(' ').length;
        return mnemonicInputCount == 12 && isValidMnemonic;
    }

    const validatePassword = (password, confirmedPassword) => {
        return password == confirmedPassword;
    }
    const [mnenonic, setMnemonic] = useState('')

    const [password, setPassword] = useState({
        password:null,
        consfirmPassowrd:null
    });

    const generatePrivateKey = () => {
        const httpNetwork = UrlBuilder.builProviderUrl(networkConfig.Url, networkConfig.Port)
        const web3 = new Web3(new Web3.providers.HttpProvider(httpNetwork));
        const wallet = Wallet.fromMnemonic(mnenonic);
        const privateKey = wallet.privateKey;
        return privateKey;
    }
    const onMnemonicSubmit = (event) => {
        event.preventDefault();
        if(validateMnemonicPhrase(mnenonic)) {
            if(!validatePassword(password.password, password.consfirmPassowrd)) {
                alert("passwords do not match");
                return;
            }           
            const privateKey = generatePrivateKey(mnenonic);
            const enctrypedPrivateKey = AES.encrypt(privateKey, `${password}`).toString();
            CookieHelper.setCoockie(Constants.PRIVATE_KEY_COCKIE_NAME,enctrypedPrivateKey,new Date(Date.now()+100000000000000))

            return <Main networkConfig={networkConfig}></Main>
        }
        alert("Invalid Mnemonic")
    }

    const onMnemonicChange = (e) => {
        setMnemonic(e.target.value);
    }
    return(
    <div className="container-fluid">
        <h1>Import Wallet</h1>
        <div>
            <div className="row">
                <form onSubmit={onMnemonicSubmit}>
                    <label className="form-label">Mnemonic</label>
                    <div className="row">
                        <input type="password" className="form-control"  onChange={(e) => onMnemonicChange(e)}></input>
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