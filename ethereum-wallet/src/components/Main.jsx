
const Main = ({ networkConfig }) => {

    return (
        <div className="container-fluid">
            <div>
                <div className="list-group" style={{ margin: 10 }}>
                    <a href="/import-wallet" className="list-group-item list-group-item-action active">Import existing wallet from recovery phrase</a>
                </div>
                <div className="list-group" style={{ margin: 10 }}>
                    <a href="/import-wallet" className="list-group-item list-group-item-action active">Import existing wallet from private key</a>
                </div>
            </div>
            <div>
                <div className="list-group" style={{ margin: 10 }}>
                    <a href="/create-wallet" className="list-group-item list-group-item-action active">Create new HD wallet</a>
                </div>
            </div>
        </div>

    )
}

export default Main
