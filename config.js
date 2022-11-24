require("dotenv").config()

const{
    PORT,
    URL,
    APIKEY,
    AUTHDOMAIN,
    PROJECTID,
    STORAGEBUCKET,
    MESSAGINGSENDERIP,
    APPID
} = process.env

module.exports = {
    port: PORT,
    url: URL,
    firebaseConfig: {
        apiKey: APIKEY,
        authDomain: AUTHDOMAIN,
        projectId: PROJECTID,
        storageBucket: STORAGEBUCKET,
        messagingSenderId: MESSAGINGSENDERIP,
        appId: APPID
    }
}