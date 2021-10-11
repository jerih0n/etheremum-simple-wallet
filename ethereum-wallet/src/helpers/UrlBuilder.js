const UrlBuilder =  {

    builProviderUrl : function(url, port) {
        const httpNetwork = `${url}:${port}`;
        return httpNetwork;
    }
}

export default UrlBuilder;