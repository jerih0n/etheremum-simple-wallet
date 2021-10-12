import logo from './logo.svg';
import './App.css';
import Main from "./components/Main"
import ImportWallet from "./components/ImportWallet"
import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory } from 'react-router-dom';
import NetworkHelper from "../src/storage/NetworksHelper"
import { Cookies } from 'react-cookie';
import { useState, useEffect } from 'react'
import NetworkData from "./components/NetworkData"
import Constants from "./storage/Constants"
import WalletManager from "./components/WalletManager"
import {BrowserRouter  as Router, Route, Switch, Redirect } from 'react-router-dom';
import CreateWallet from './components/CreateWallet';
import WalletBasicInfo from './components/wallet-controlls/WalletBasicInfo';

function App() {

  const history = useHistory()

  const[defaultNetworkConfig,setConfig] = useState({});
  const[privateKey, setPrivateKeyFromCoockie] = useState(null)
  const[isPrivateKeyPresent, setIsPrivateKeyPresent] = useState(false)

  useEffect(()=> {
    const defaultConfig =  NetworkHelper.getDefaultNetwork();
    console.log(defaultConfig);
    
    setConfig(defaultConfig);

    console.log(defaultNetworkConfig);
  },[defaultNetworkConfig])

  const RenderRedirect =() => {
    if(isPrivateKeyPresent) {
      console.log("private key preset " + isPrivateKeyPresent)

      return <WalletManager 
      url={defaultNetworkConfig.Url} 
      encryptedPrivateKey={privateKey}
      port={defaultNetworkConfig.Port}
></WalletManager>
    }
    return  <Main networkConfig={defaultNetworkConfig}></Main>
  }
  useEffect(() => {
    const coockieManager = new Cookies();
    const privateKeyEncrypted = coockieManager.get(Constants.PRIVATE_KEY_COCKIE_NAME)
    if(privateKeyEncrypted) {
      setPrivateKeyFromCoockie(privateKeyEncrypted);
      setIsPrivateKeyPresent(true);
      console.log("called oneces " + isPrivateKeyPresent)
      return;
    }
    console.log("called outside use effect " + isPrivateKeyPresent)
    setIsPrivateKeyPresent(false);
  })

  return (
  <div className="container">          
      <div className="container-fluid">
        <div style={{margin:50}}>
          This is simple ethereum wallet. For Deloveloping Purposes only. Please do not use it with main ethereum net
          Please Chose an Option
        </div>
      </div>
      <Router history={history}>
          <Switch>         
            <Route path="/create-wallet">
                <CreateWallet networkConfig={defaultNetworkConfig} ></CreateWallet>
            </Route>
            <Route path="/import-wallet">
                <ImportWallet networkConfig={defaultNetworkConfig}></ImportWallet>
            </Route>
            <Route path='/wallet-manager'>
                
            </Route>
            <Route path='/wallet-basic-info' component={WalletBasicInfo}></Route>
            <Route path="/">
                {RenderRedirect()}
            </Route>
          </Switch>
      </Router>     
    <NetworkData network={defaultNetworkConfig}/>
  </div>
   
  );
}

export default App;
