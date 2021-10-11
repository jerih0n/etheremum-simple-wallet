import logo from './logo.svg';
import './App.css';
import Main from "./components/Main"
import ImportWallet from "./components/ImportWallet"
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import NetworkHelper from "../src/storage/NetworksHelper"
import { useCookies } from 'react-cookie';
import { useState, useEffect } from 'react'
import NetworkData from "./components/NetworkData"

function App() {


  const[defaultNetworkConfig,setConfig] = useState({});

  useEffect(()=> {
    const defaultConfig =  NetworkHelper.getDefaultNetwork();
    console.log(defaultConfig);
    
    setConfig(defaultConfig);

    console.log(defaultNetworkConfig);
  },[defaultNetworkConfig])

  return (
    <div className="container">    
      <Router>
          <Switch>
          <Route path="/import-wallet">
              <ImportWallet></ImportWallet>
          </Route>
          <Route>
              <Main></Main>
            </Route>            
          </Switch>
      </Router>
      <NetworkData network={defaultNetworkConfig}/>
    </div>
   
  );
}

export default App;
