
const Main = () => {

    return(
        <div className="container-fluid">
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