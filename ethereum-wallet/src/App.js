import logo from './logo.svg';
import './App.css';
import Main from "./components/Main"
import ImportWallet from "./components/wallet-creation/ImportWallet"
import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory } from 'react-router-dom';
import NetworkHelper from "../src/storage/NetworksHelper"
import { Cookies } from 'react-cookie';
import { useState, useEffect } from 'react'
import NetworkData from "./components/NetworkData"
import Constants from './storage/Constants'
import WalletManager from "./components/wallet-controlls/WalletManager"
import {BrowserRouter  as Router, Route, Switch, Redirect } from 'react-router-dom';
import CreateWallet from './components/wallet-creation/CreateWallet';
import WalletBasicInfo from './components/wallet-controlls/WalletBasicInfo';
import CookieHelper from './helpers/CookieHelper';

function App() {

  const history = useHistory()

  const[defaultNetworkConfig,setConfig] = useState({});
  const[privateKey, setPrivateKeyFromCoockie] = useState(null)
  const[isPrivateKeyPresent, setIsPrivateKeyPresent] = useState(false)

  useEffect(()=> {
    const defaultConfig =  NetworkHelper.getDefaultNetwork();
    setConfig(defaultConfig);
  },[defaultNetworkConfig])

  const RenderRedirect =() => {
    if(isPrivateKeyPresent) {
      console.log("private key preset " + isPrivateKeyPresent)

      return <WalletManager 
      url={defaultNetworkConfig.Url} 
      encryptedPrivateKey={privateKey}
      port={defaultNetworkConfig.Port}
      className="row"
></WalletManager>
    }
    return  <Main networkConfig={defaultNetworkConfig} className="row"></Main>
  }
  useEffect(() => {
    const privateKeyEncrypted = CookieHelper.getCoockie(Constants.PRIVATE_KEY_COOKIE_NAME)
    console.log(privateKeyEncrypted);
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
      <div className="row">
        <div style={{margin:50}}>
          This is simple ethereum wallet. For Deloveloping Purposes only. Please do not use it with main ethereum net
          Please Chose an Option
        </div>
      </div>
      <Router history={history}>
          <Switch>         
            <Route path="/create-wallet">
                <CreateWallet networkConfig={defaultNetworkConfig} className="row"></CreateWallet>
            </Route>
            <Route path="/import-wallet">
                <ImportWallet networkConfig={defaultNetworkConfig} className="row"></ImportWallet>
            </Route>
            <Route path='/wallet-manager'>
              <WalletManager
                url={defaultNetworkConfig.Url} 
                encryptedPrivateKey={privateKey}
                port={defaultNetworkConfig.Port}
                className="row"
                ></WalletManager>
            </Route>
            <Route path='/wallet-basic-info' component={WalletBasicInfo} className="row"></Route>
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
