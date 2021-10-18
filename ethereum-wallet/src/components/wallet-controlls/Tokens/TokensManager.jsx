import { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import Constants from "../../../storage/Constants";
import LocalStorageHelper from "../../../storage/LocalStorageHelper";
import AddTokenPopup from "../../Popups/AddTokenPopup";
import Token from "./Token";

const TokensManager = ({ account, url }) => {

    const onTokenAddPopupResponse = () => {
        document.getElementById('addTokenPopup').remove();
    }

    const [tokensCount, setTokensCount] = useState(0);

    const renderTokensData = () => {
        const tokenLocalStorageName = LocalStorageHelper.createLocalStorageKey(Constants.LOCAL_STORAGE_TOKENS_PREFIX, account.address);
        const tokensCollection = JSON.parse(LocalStorageHelper.getItemFromLocalStorage(tokenLocalStorageName));

        if (tokensCollection != null && tokensCollection.length > 0) {
            return (
                <tbody>
                    {tokensCollection.map(x => (<Token key={x.address} account={account} token={x} url={url}></Token>))}
                </tbody>
            )
        }

        return (<tbody></tbody>)
    }

    return (
        <div className="contaner">
            <div className="row">
                <div className="row">
                    <div className="row">
                        <h5 style={{ textAlign: "center" }}>Tokens</h5>
                    </div>
                    <table className="table-info">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Code</th>
                                <th>Balance</th>
                                <th colSpan='2'>Action</th>
                            </tr>
                        </thead>
                        {renderTokensData()}
                    </table>
                </div>
                <div className="row">
                    <Popup position='top center' trigger={<button className='btn btn-primary' style={{ borderRadius: "10px;", marginTop: "3%" }}  >Add Token</button>}>
                        <AddTokenPopup url={url} accountAddress={account.address} callBack={onTokenAddPopupResponse}></AddTokenPopup>
                    </Popup>
                </div>
            </div>
        </div>
    )
}

export default TokensManager;