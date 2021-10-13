
import Cookies from "universal-cookie"

const CookieHelper = {


    setCoockie: function (key, value, expirationTime) {
        const coockieHelper = new Cookies();
        coockieHelper.set(key, value, { expires: expirationTime })
    },

    getCoockie: function (key) {
        const coockieHelper = new Cookies();
        return coockieHelper.get(key);
    },

    removeCoockie: function (key) {
        const coockieHelper = new Cookies();
        coockieHelper.remove(key);
    }
}
export default CookieHelper