

const EthereumValidator = {
    
    baseAddressValidationRegges: /^(0x)?[0-9a-f]{40}$/i,

    isValidAddress: function(address) {
        if(typeof(address) != String) {
            address = address.toString();
        }
        return this.baseAddressValidationRegges.test(address);
    }
}
export default EthereumValidator;