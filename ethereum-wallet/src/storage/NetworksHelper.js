
import networks from "./Networks.json"

var NetworkHelper = {

    getDefaultNetwork: function () {
        const defaultNetwork = networks.Newtworks.filter(network => network.IsDefault)[0]
        if (!defaultNetwork) {
            throw new Error("No Default Network is Provided. Please Check The Configuration File")
        }
        return defaultNetwork;
    }

}
export default NetworkHelper