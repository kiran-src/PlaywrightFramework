// tokenStorage.js
let token = null;

function setToken(newToken) {
    token = newToken;
}

function getToken() {
    if (!token) {
        throw new Error("Token not set. Ensure login has been completed.");
    }
    return token;
}

module.exports = { setToken, getToken };
