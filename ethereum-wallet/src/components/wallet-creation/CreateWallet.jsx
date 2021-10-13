import { useEffect, useState } from "react"
import { ethers } from "ethers"
import CookieHelper from "../../helpers/CookieHelper";
import Constants from "../../storage/Constants";

import NewAccountData from './NewAccountData'
import CryptographyHelper from "../../helpers/CryptographyHelper";

const CreateWallet = ({networkConfig}) => {

    const onSubmit = (event) => {
        event.preventDefault();
    
        if(password != passwordConfirm) {
            alert('Passwords do not match')
            return;
        }
       const newWallet = ethers.Wallet.createRandom();      
       setMnemonic(newWallet.mnemonic.phrase);
       setPrivateKey(newWallet.privateKey);
       const privateKeyEnc = CryptographyHelper.encryptPrivateKey(newWallet.privateKey,password);
       CookieHelper.setCoockie(Constants.PRIVATE_KEY_COOKIE_NAME,privateKeyEnc);
    }

    const renderAccountData = () => {

        if(mnemonic != null) {
            return <NewAccountData mnemonic={mnemonic} privateKey={privateKey}></NewAccountData>
        }
    }

    const[password,setPassword] = useState(null);
    const[passwordConfirm, setPasswordConfigrm] = useState(null);
    const[mnemonic, setMnemonic] = useState(null);
    const[privateKey, setPrivateKey] = useState(null);

    return (
    <div className="container-fluid">
        <h1>Create new wallet</h1>
        <div>
        <div className="row" style={{marginBottom:'30px'}}>
            <form onSubmit={onSubmit}>
                <div className="form-row">
                    <div className="col">
                        <input type="password" className="form-control" placeholder="Password"  style={{marginBottom:20}} onChange={ e => setPassword(e.target.value)}/>
                    </div>
                    <div className="col">
                        <input type="password" className="form-control" placeholder="Confirm Password" style={{marginBottom:20}} onChange={e => setPasswordConfigrm(e.target.value)}/>
                    </div>
                </div>
                <input type="submit" value="Submit" className="btn btn-primary" style={{marginTop:20}}></input>           
            </form>
        </div>
        {renderAccountData()}
     </div>       
</div>)
}

export default CreateWallet;