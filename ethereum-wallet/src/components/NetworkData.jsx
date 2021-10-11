

const NetworkData = ({network}) => {

    return(
        <div className="container-m" style={{margin:20}}>           
            <div className="row">
                <div className="col-6">
                    <h3>Newtowork Information</h3>
                </div>
            </div>
            <div className="row">
                <div className="col">URL: <b>{network.Url}</b></div>
                <div className="col">PORT: <b>{network.Port}</b></div>
                <div className="col">Chain ID: <b>{network.ChainId}</b></div>
                <div className="col">Name: <b>{network.Name}</b></div>
            </div>
        </div>
    )
}

export default NetworkData