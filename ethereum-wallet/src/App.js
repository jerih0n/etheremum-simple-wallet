import logo from './logo.svg';
import './App.css';
import Main from "./components/main"
import ImportWallet from "./components/ImportWallet"
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"


function App() {
  return (
    <div className="container">
      <Router>
          <Switch>
          <Route path="/import">
              <ImportWallet></ImportWallet>
            </Route>
            <Route>
              <Main></Main>
            </Route>            
           </Switch>
          
      </Router>
    </div>
   
  );
}

export default App;
