
import 'bootstrap/dist/css/bootstrap.min.css';


import { useState, useEffect } from 'react'

const ImportWallet = () => {

    const validateMnemonicPhrase = (mnemonicInput) => {
        const mnemonicInputCount = mnemonicInput.split(' ').length;
        return mnemonicInputCount == 12;
    }

    const [mnenonic, setMnemonic] = useState('')
    
    const onMnemonicSubmit = (event) => {
        event.preventDefault();
        if(validateMnemonicPhrase(mnenonic)) {
            //save create private key
            console.log(mnenonic);
        }
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
                    <input type="submit" value="Submit" className="btn btn-primary" style={{margin:20}}></input>           
                </form>
            </div>
        </div>       
        </div>
    )


    
}

export default ImportWallet