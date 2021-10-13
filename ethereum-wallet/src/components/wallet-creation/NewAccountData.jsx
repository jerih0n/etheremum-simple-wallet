import { useState } from "react"
import { Redirect } from "react-router-dom"
import { useHistory } from 'react-router-dom';

const NewAccountData = ({mnemonic,privateKey}) => {

    const history = useHistory()
    const showPrivateKeyPress = () => {
        setInputTypes({
            privateKey: !imputTypes.privateKey,
            mnemonic: imputTypes.mnemonic
        })
    }

    const showMnemonicPress = () => {
        setInputTypes({
            privateKey: imputTypes.privateKey,
            mnemonic: !imputTypes.mnemonic
        })
    }
    
    const[imputTypes, setInputTypes] = useState({
        privateKey:false,
        mnemonic:false
    });

    const onContinueClick = () => {
        const alertAnswer = window.confirm("Please check again that you have saved your recovery phrase or private key! If you not, you will not be able to recovere your wallet");
        if(alertAnswer) {
            return history.push('/main')
        }
    }

    return (
 <div className="container" style={{backgroundColor:"#C04B46"}}>
            <div className="row">
                <div className="column" style={{marginLeft:'auto'}}>
                    <p style={{color:"white"}}>New wallet private key and recovery phrase. Do not lose them, or your coins will be lost forever!</p>
                    <p style={{color:"white"}}>Record and keep the data in safe place</p>
                </div>
            </div>
            <div className="row">
            <div className="form-group" style={{marginBottom:'20px'}}>
                    <input type={imputTypes.privateKey? 'text':'password'} id="privateKey" value={privateKey} readOnly className='form-controll' disabled/>
                    <button style={{marginLeft:'20px'}} className='btn btn-warning' onClick={showPrivateKeyPress}>Show Private Key</button>
                </div>
            </div>
            <div className="row">
                <div className="form-group" className="column" style={{marginBottom:'20px'}}>
                    <input type={imputTypes.mnemonic? 'text':'password'} id="mnemonic" value={mnemonic} readOnly className='form-controll' disabled/>
                    <button style={{marginLeft:'20px'}} className='btn btn-warning' onClick={showMnemonicPress}>Show Recovery Phrase</button>
                </div>
            </div>             
            <div className="row" >
                <button className='btn btn-info' onClick={onContinueClick} style={{marginTop:"20px;", marginBottom:"20px;"}}>Continue</button>
            </div>
            
        </div>
    )
}
export default NewAccountData;