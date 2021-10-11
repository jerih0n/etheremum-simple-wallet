
const Main = () => {

    return(
        <div className="container-fluid">
            <h1>This is simple ethereum wallet. For Deloveloping Purposes only. Please do not use it with main ethereum net</h1>
            <h3>Please Chose an Option</h3>
            <div>
                <div className="list-group" style={{margin:10}}>
                    <a href="/create-wallet" className="list-group-item list-group-item-action active">Create new Wallet</a>
                </div>
                <div className="list-group" style={{margin:10}}>
                    <a href="/import-wallet" className="list-group-item list-group-item-action active">Import Existing Wallet</a>
                </div>
            </div>
        </div>
       
    )
}


export default Main