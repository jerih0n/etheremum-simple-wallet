import { useCallback, useEffect, useState } from "react"
import Popup from "reactjs-popup";
import ERC20TokenService from "../../../services/ERC20TokenService"
import SendTokenPopup from "../../Popups/SendTokenPopup";


const Token = ({ account, token, url }) => {

    const erc20TokenService = new ERC20TokenService(url, token.address);

    const onSendTokenResponse = (result) => {
        const id = `token-transaction-${token.name}`;
        document.getElementById(id).remove();
    }

    useCallback(() => {
        erc20TokenService.getDecimals(account.address)
        .then(d => {
            setDecimals(d);
        }).catch(error => console.log(error))
    },[])

    useEffect(() => {

        erc20TokenService.getBalance(account.address)
        .then(x => {
            let balance = x / decimals;
            setTokenBalance(balance)

        }).catch(error => console.log(error))

    },[])

    const[tokenBalance, setTokenBalance] = useState(0);
    const[decimals, setDecimals] = useState(1);

    return (
        <tr class="table-info">
            <td><b>{token.name}</b></td>
            <td><b>{token.symbol}</b></td>
            <td><b>{tokenBalance} {token.symbol}</b></td>
            <td>
                <Popup position='top center' trigger={ <button className='btn btn-primary' style={{ borderRadius: "15px" }} id="pop-up-send">Send</button>}> 
                    <SendTokenPopup account={account} token={token} decimals={decimals} sendTokenCallback={onSendTokenResponse}/>
                </Popup>
               
            </td>
            <td>
                <button className='btn btn-info' style={{ borderRadius: "15px" }} >History</button>
            </td>
        </tr>
    )
}

export default Token;