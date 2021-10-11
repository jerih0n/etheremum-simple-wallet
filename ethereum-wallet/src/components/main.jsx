import { Route, Router, Switch } from "react-router"
import ImportWallet from "./ImportWallet"
const Main = (networkConfig) => {

    return(
        <div className="container-fluid">
            <div>
                <div className="list-group" style={{margin:10}}>
                    <a href="/import-wallet" className="list-group-item list-group-item-action active">Import Existing Wallet</a>
                </div>
            </div>
        </div>
       
    )
}

export default Main