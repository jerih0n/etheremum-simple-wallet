

const Token = ({account, token, url}) => {

    const onSendPress = () => {
        console.log('Send form token ' + token.name)
    }
    return(
        <tr>
            <td>{token.address}</td>
            <td>{token.name}</td>
            <td>{token.symbol}</td>
            <td>
                <button className='' onClick={onSendPress}>Send</button>
            </td>
        </tr>
    )
}

export default Token;