

const Token = ({ account, token, url }) => {

    const onSendPress = () => {
        console.log('Send form token ' + token.name)
    }
    return (
        <tr class="table-info">
            <td><b>{token.name}</b></td>
            <td><b>{token.symbol}</b></td>
            <td><b>0 {token.symbol}</b></td>
            <td>
                <button className='btn btn-primary' style={{ borderRadius: "15px" }} onClick={onSendPress}>Send</button>
            </td>
            <td>
                <button className='btn btn-info' style={{ borderRadius: "15px" }} onClick={onSendPress}>History</button>
            </td>
        </tr>
    )
}

export default Token;