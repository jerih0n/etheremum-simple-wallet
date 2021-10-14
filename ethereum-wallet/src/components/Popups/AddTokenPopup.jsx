
import EthereumValidator from '../../helpers/EthereumValidator'
import Web3 from "web3";
import ERC20TokenService from "../../services/ERC20TokenService";
import LocalStorageHelper from "../../storage/LocalStorageHelper";
import Constants from "../../storage/Constants";
import { useState } from 'react';
const AddTokenPopup = ({url, accountAddress, callBack}) => {

    const[tokenAddress, setTokenAddress] = useState(null);
    const[tokenName, setTokenName] = useState(null);
    const[tokenSymbol, setTokenSymbol] = useState(null);
    const[addTokenEnabled, setAddTokenEnabled] = useState(false);


    const addToken = () => {

        if(addTokenEnabled) {

            const locatStorageKey = LocalStorageHelper.createLocalStorageKey(Constants.LOCAL_STORAGE_TOKENS_PREFIX,accountAddress);

            if(LocalStorageHelper.getItemFromLocalStorage(locatStorageKey) == null) {
                LocalStorageHelper.addToLocalStorage(locatStorageKey,[]);
            }
            let allAddedTokens = JSON.parse(LocalStorageHelper.getItemFromLocalStorage(locatStorageKey));
            let currentToken = allAddedTokens.filter(x => x.symbol == tokenSymbol)[0];

            if(currentToken != null) {
                alert('Token Already Added')
                return; //close
            }
            allAddedTokens.push({
                name: tokenName,
                symbol: tokenSymbol,
                address: tokenAddress
            });
            console.log(allAddedTokens)
            LocalStorageHelper.addToLocalStorage(locatStorageKey, allAddedTokens);
            callBack();
        }
    }
    const setBasicTokenData = (er20Service) => {

        if(er20Service != null) {
            er20Service.getName()               
            .then(x => {

                setTokenName(x);
                console.log(x);
            })
            .catch(error => console.log(error));

            er20Service.getSimbol()               
            .then(x => {
                setTokenSymbol(x);
                console.log(x);
            })
            .catch(error => console.log(error));
        } 
    }
    const onEthereumAddressEnter = (event) => {    
        const address = event.target.value;
        console.log(address);
        setTokenAddress(address);
        if(EthereumValidator.isValidAddress(address)) {
            try {
                const er20Service = new ERC20TokenService(url,address)
                setBasicTokenData(er20Service);
                setAddTokenEnabled(true);
            }
            catch(error) {
                console.log(error);
            }
        }
    }
    return(
        <div id='addTokenPopup'>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Add Token</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => callBack()}></button>
                </div>
                <div className="modal-body" style={{fontSize:"18px"}}>
                    <h3>Add new ERC20 Token</h3>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className="mb-3">
                            <label for={tokenAddress} className="form-label">Token Address</label>
                            <input type="text" class="form-control" placeholder='0xTokenAddress' onChange={ (e) => onEthereumAddressEnter(e)}/>
                        </div>
                        <div className="mb-3">
                            <label for="exampleInputPassword1" className="form-label">Name</label>
                            <input type="input" class="form-control" readOnly value={tokenName}/>
                        </div>
                        <div className="mb-3">
                            <label for="exampleInputPassword1" className="form-label">Symbol</label>
                            <input type="input" class="form-control" readOnly value={tokenSymbol}/>
                        </div>                        
                    </form>
                </div>
                <div className="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" disabled={!addTokenEnabled} onClick={addToken}>Add Token</button>
                    <button type="button" class="btn btn-primary" onClick={() => callBack()}>Cancel</button>
                </div>
            </div>
        </div>
    </div>
    )
}
export default AddTokenPopup;