
import CryptoJS from "crypto-js"

const CryptographyHelper = {

    encryptPrivateKey(privateKey, password) {
        try {
            const encryptedPK = CryptoJS.Rabbit.encrypt(privateKey, `${password}`);
            const result = encryptedPK.toString();
            console.log("the result is " + result);
            return result;
        } catch (error) {
            console.log(error)
        }


    },
    dencryptPrivateKey(encryptedPrivateKey, password) {
        try {
            const dencryptedPKWord = CryptoJS.Rabbit.decrypt(`${encryptedPrivateKey}`, password)
            const result = CryptoJS.enc.Utf8.stringify(dencryptedPKWord);
            return result;
        } catch (error) {
            console.log(error)
        }
    }
}
export default CryptographyHelper