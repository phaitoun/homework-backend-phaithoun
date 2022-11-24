const admin = require("firebase-admin")
const config = require("./config")
const serviceAccount = require("./souk-beckend-firebase-adminsdk-8vafg-c571099fa0.json")
const { credentail} = require("firebase-admin")
const firebaseConfig = config.firebaseConfig

const database = admin.initializeApp({
    firebaseConfig,
    credential: admin.credential.cert(serviceAccount)
})


module.exports = {
    database
}
