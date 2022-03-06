const express = require("express")
var bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({
    extended: true
  }));
/**** START DATA SECTION ****/

const players = new Set()
var roomExample = {
    private: true,
    roomName: "Boob",
    roomCode: "aw2e34qadad3",
    owner: "Braden Little"
}
const rooms = {}

/**** START DATA SECTION ****/

/**** HELPER FUNCTIONS ****/

const packError = (err) => {
    return JSON.stringify({error: err})
}

const isEmpty = (obj) => {
    return obj.constructor === Object && Object.keys(obj).length === 0
}

/**** START ENDPOINTS ****/

/*# Start Welcome Page #*/

/**
 * Creates a new player
 * @method POST
 * @body JSON { player-name: String }
 * @response ACK
 */
app.post("/new-player", (req, res) => {
    const body = req.body
    if (isEmpty(body)) 
        res.status(400).send(packError("Body missing"))
    const playerName = body["player-name"]
    if ( playerName === undefined || playerName.length === 0 ) 
        res.status(400).send(packError("Missing player-name"))

    if ( players.has(playerName) ) 
        res.status(409).send(packError("username already in use"))
    
    players.add(playerName)

    res.send(playerName)
});

app.post("/remove-player", (req, res) => {
    const body = req.body
    if (isEmpty(body)) 
        res.status(400).send(packError("Body missing"))
    const playerName = body["player-name"]
    if ( playerName === undefined || playerName.length === 0 ) 
        res.status(400).send(packError("Missing player-name"))

    if ( !players.has(playerName) ) 
        res.status(409).send(packError("username already deleted"))
    
    players.delete(playerName)

    res.send(playerName)
})

/*# End Welcome Page #*/

/*# Start Dashboard Page #*/

/**
 * Gets the open rooms
 * @method GET
 * @param username: String
 * @param code: String
 */
app.get("/open-rooms", (req, res) => {

    res.send(JSON.stringify(rooms))
});

/*# End Dashboard Page #*/

/*# Start Results Page #*/

/**
 * Gets the open rooms
 * @method GET
 * @body None
 * @response 
*/
app.get("/get-game-results", (req, res) => {
    res.send("Unimplemented Endpoint")

});

/*# End Results Page #*/

/*# Start Room Config Page #*/

app.post("/create-room", (req, res) => {
    res.send("Unimplemented Endpoint")

});

/*# End Room Config Page #*/

/*# Start Waiting Page #*/

app.get("/room-status", (req, res) => {
    res.send("Unimplemented Endpoint")

});

/*# End Waiting Page #*/

/*# Start Word Selection Page #*/

app.post("/submit-word-selection", (req, res) => {
    res.send("Unimplemented Endpoint")

});

/*# End Word Selection Page #*/

/*# Start Game Page #*/

app.post("/guess-word", (req, res) => {
    res.send("Unimplemented Endpoint")

});

app.get("/get-opponent-state", (req, res) => {
    res.send("Unimplemented Endpoint")

})

app.get("/get-challange-word", (req, res) => {
    res.send("Unimplemented Endpoint")

});

/*# End Game Page #*/

/**** END ENDPOINTS ****/

const server = app.listen(3000, () => {
    const host = server.address().address;
    const port = server.address().port;
    console.log("WordDuel running at http://%s:%s", host, port);
})