import localStorage from 'store2'

function getConfig() {
    if (localStorage.has("config")) {
        return localStorage.get("config");
    } else {
        return null;
    }
}

function setLocalData(_config) {
    localStorage.set("config", _config);
}

export {
    getConfig,
    setLocalData
};
