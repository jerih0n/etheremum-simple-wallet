import logo from './logo.svg';
import './App.css';
import Main from "./components/Main"
import ImportWallet from "./components/ImportWallet"
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import NetworkHelper from "../src/storage/NetworksHelper"
import { Cookies } from 'react-cookie';
import { useState, useEffect } from 'react'
import NetworkData from "./components/NetworkData"
import Constants from "./storage/Constants"
import WalletManager from "./components/WalletManager"


function App() {


  const[defaultNetworkConfig,setConfig] = useState({});
  const[privateKey, setPrivateKeyFromCoockie] = useState(null)

  useEffect(()=> {
    const defaultConfig =  NetworkHelper.getDefaultNetwork();
    console.log(defaultConfig);
    
    setConfig(defaultConfig);

    console.log(defaultNetworkConfig);
  },[defaultNetworkConfig])

 
  useEffect(() => {
    const coockieManager = new Cookies();
    const privateKeyEncrypted = coockieManager.get(Constants.PRIVATE_KEY_COCKIE_NAME)
    if(privateKeyEncrypted) {
      setPrivateKeyFromCoockie(privateKeyEncrypted);
    }
  },[])

  const renderMenu = () => {
    if(privateKey) {
      return <WalletManager 
      url={defaultNetworkConfig.Url} 
      encryptedPrivateKey={privateKey}
      port={defaultNetworkConfig.Port}
      ></WalletManager>
    }else {
      return (
        <ImportWallet networkConfig={defaultNetworkConfig} recoveryMode={false}></ImportWallet>
      )
    }
  }
  return (
  <div className="container">          
      <div className="container-fluid">
        <div style={{margin:50}}>
          This is simple ethereum wallet. For Deloveloping Purposes only. Please do not use it with main ethereum net
          Please Chose an Option
        </div>
      </div>
      {renderMenu()}  
             
    <NetworkData network={defaultNetworkConfig}/>
  </div>
   
  );
}

export default App;
