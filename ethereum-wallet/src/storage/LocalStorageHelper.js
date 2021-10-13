

const LocalStorageHelper = {

    addToLocalStorage: function(key, value) {
        if(typeof(value) != String) {
            value = JSON.stringify(value);
        }
        localStorage.setItem(key, value);
    },

    getItemFromLocalStorage: function(key) {
        return localStorage.getItem(key);
    },

    removeItemFromStorage: function(key) {
        localStorage.removeItem(key);
    },

    createLocalStorageKey(key,accountAddress) {
        return `${key}_${accountAddress}`
    }
}
export default LocalStorageHelper