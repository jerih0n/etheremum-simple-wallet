
const ConfirmTransactionPopup = ({address, amount, gassPrice, symbol, confirmationCallback}) => {

    return(
        <div id='popUp'>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Transaction Confirmation</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => confirmationCallback(false)}></button>
                </div>
                <div className="modal-body" style={{fontSize:"18px"}}>
                    <p>Please confirm the following transaction</p>
                    <p>Recieving address: <b>{address}</b></p>
                    <p>Amount to send: <b>{amount} {symbol} </b></p>
                    <p>Estimated gass price: <b>{gassPrice} ETH </b></p>
                </div>
                <div className="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onClick={() => confirmationCallback(true)}>Confirm</button>
                    <button type="button" class="btn btn-primary" onClick={() => confirmationCallback(false)}>Cancel</button>
                </div>
            </div>
        </div>
    </div>
    )
}
export default ConfirmTransactionPopup