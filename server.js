const express = require("express")
const bodyParser = require('body-parser')
const {v4: uuid } = require("uuid")
const fs = require('fs');

const app = express()
app.use(bodyParser.json())

app.use(bodyParser.urlencoded({
    extended: true
}));

// Add headers before the routes are defined
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    
    next();
});
/**** MODEL SECTION ****/

function Room(name, private, owner) {
    this.name = name
    this.private = (private === 'true')
    this.owner = owner
    this.players = [ owner ]
    this.states = {
        [owner]: []
    }
    this.times = {
        [owner]: {
            startTime: undefined,
            endTime: undefined
        }
    }
    this.wordSelection = {}
    this.code = uuid()
    this.status = "open"
    this.winner = undefined
}

/**** START DATA SECTION ****/

const players = new Set()
const raw = fs.readFileSync('words.txt').toString().split("\n");
const wordLookupTable = {}
raw.forEach(word => wordLookupTable[word] = word)

var roomExamplePrivate = new Room("Braden's Room", "true", "Braden Little")
var roomExamplePublic = new Room("Renee's Room", "false", "Renee")
var testRooms = {
    [roomExamplePrivate.code]: roomExamplePrivate,
    [roomExamplePublic.code]: roomExamplePublic
}
const rooms = testRooms

/**** START DATA SECTION ****/

/**** HELPER FUNCTIONS ****/

const packError = (err) => {
    return ({error: err})
}

const isEmpty = (obj) => {
    return obj.constructor === Object && Object.keys(obj).length === 0
}

const isBlank = (str) => {
    return str === undefined || str.length === 0
}

const getRoom = (code) => {
    const searchResult = Object.values(rooms).filter(room => room.code === code)
    if (searchResult === undefined) return undefined
    return searchResult[0]
}

const roomReady = (room) => {
    const player1Ready = room.wordSelection[room.players[0]] !== undefined
    const player2Ready = room.wordSelection[room.players[1]] !== undefined

    return  player1Ready && player2Ready
}

const getOpponent = (room, username) => {
    const players = room.players
    if (room.players[0] === username) 
        return room.players[1]
    else
        return room.players[0]
}

const getChallangeWord = (room, username) => {
    const opponent = getOpponent(room, username)
    return room.wordSelection[opponent]
}

const evaluate = (guess, challangeWord) => {
    const gArray = Array.from(guess)
    const cArray = Array.from(challangeWord)
    var pattern = ""
    for (var i = 0; i < gArray.length; i++){
        const c = cArray[i]
        const g = gArray[i]
        if (c === g) pattern += "G" // match value and location
        else if (cArray.includes(g)) pattern += "Y" // match location
        else pattern += "B" // no match
    }
    return pattern
}

const bankPattern = (pattern, guess, room, username) => {
    room.states[username].push({guess: guess, pattern: pattern})
}

const winningPattern = (pattern) => {
    return pattern === "GGGGG"
}

const gameOver = (room) => {
    const p1 = room.players[0]
    const p2 = room.players[1]
    const p1Done = (room.winner === p1) || (room.states[p1].length === 6)
    const p2Done = (room.winner === p2) || (room.states[p2].length === 6)
    return p1Done && p2Done
}

const generateStats = (room, username) => {
    const times = room.times[username]
    return ({
        guesses: room.states[username],
        duration: times.endTime - times.startTime
    })
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
    console.log(body)
    if (isEmpty(body)) {
        res.status(400).send(packError("Body missing"))
        return
    }
    const playerName = body["name"]
    if ( isBlank(playerName) )  {
        res.status(400).send(packError("Missing player-name"))
        return;
    }

    if ( players.has(playerName) ) {
        res.status(409).send(packError("username already in use"))
        return
    }    
    players.add(playerName)
    res.send(({status: "sucess"}))
});

app.post("/remove-player", (req, res) => {
    const body = req.body
    if (isEmpty(body)) {
        res.status(400).send(packError("Body missing"))
        return
    }
    const playerName = body["player-name"]
    if ( isBlank(playerName) ) {
        res.status(400).send(packError("Missing player-name"))
        return
    }
    if ( !players.has(playerName) ) {
        res.status(409).send(packError("username already deleted"))
        return;
    }
    
    players.delete(playerName)

    res.send({status: "sucess"})
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
    const filteredRooms = Object.values(rooms)
    .filter(room => (!room.private))
    .filter(room => (room.status === "open"))
    .map(room => ({code: room.code, name: room.name}))
    res.send((filteredRooms))
});

app.post("/join-room", (req, res) => {
    const body = req.body;
    if (isEmpty(body)) {
        res.status(400).send(packError("Missing body"))
        return;
    }
    const code = body.code;
    const username = body.username
    if (isBlank(code)) {
        res.status(400).send(packError("Missing code"))
        return;
    }
    if (isBlank(username)) {
        res.status(400).send(packError("Missing username"))
        return;
    }

    const room = getRoom(code)
    if (room === undefined) {
        res.status(404).send(packError("Unknown room code"))
        return;
    }    
    room.players.push(username)
    room.states[username] = []
    room.times[username] = {
        startTime: undefined,
        endTime: undefined
    }
    room.status = "word-selection"
    res.send(({status: "Sucess"}))
})


/*# End Dashboard Page #*/

/*# Start Results Page #*/

/**
 * Gets the open rooms
 * @method GET
 * @body None
 * @response 
*/
app.get("/get-game-results", (req, res) => {
    const query = req.query
    if (isEmpty(query)) {
        res.status(400).send(packError("Missing query"))
        return;
    }
    const code = query.code
    if (isBlank(code)) {
        res.status(400).send(packError("Missing code parameter"))
        return;
    }
    const room = getRoom(code)
    if (room === undefined) {
        res.status(404).send(packError("Unknown room code"))
        return;
    }
    const p1 = room.players[0]
    const p2 = room.players[1]
    const results = {
        winner: room.winner,
        stats: {
            [p1]: generateStats(room, p1),
            [p2]: generateStats(room, p2)
        }
    }
    res.send("Unimplemented Endpoint")
});

/*# End Results Page #*/

/*# Start Room Config Page #*/

app.post("/create-room", (req, res) => {
    const body = req.body;
    if (isEmpty(body)) {
        res.status(400).send(packError("Missing body"))
        return;
    }
    
    const private = body["private"]
    const name = body["name"]
    const username = body["username"]

    if (isBlank(private)) {
        res.status(400).send(packError("Missing private parameter"))
        return;
    }
        
    if (isBlank(name)) {
        res.status(400).send(packError("Missing name parameter"))
        return;
    }
    if (isBlank(username)){
        res.status(400).send(packError("Missing username parameter"))
        return;
    }
    
    const newRoom = new Room(name, private, username)

    rooms[newRoom.code] = newRoom
    res.send(({ status: "Sucess" }))
});



/*# End Room Config Page #*/

/*# Start Waiting Page #*/

app.get("/room-status", (req, res) => {
    const query = req.query
    if (isEmpty(query)) {
        res.status(400).send(packError("Missing query parameters"))
        return;
    }
    const code = query.code
    if (isBlank(code)) {
        res.status(400).send(packError("Missing code parameter"))
        return;
    }
    
    const room = getRoom(code)
    if (room === undefined)
        res.status(404).send(packError("Unknown room code"))
    else
        res.send(({ status: room.status }))
});

/*# End Waiting Page #*/

/*# Start Word Selection Page #*/

app.post("/submit-word-selection", (req, res) => {
    const body = req.body 
    if ( isEmpty(body) )
        res.status(400).send(packError("Missing body"))
    const code = body.code
    const word = body.word
    const username = body.username
    if (isBlank(code)) {
        res.status(400).send(packError("Missing code parameter"))
        return;
    }
    if (isBlank(word)) {
        res.status(400).send(packError("Missing word parameter"))
        return;
    }
    if (isBlank(username)) {
        res.status(400).send(packError("Missing username parameter"))
        return;
    }
    const room = getRoom(code)
    const roomWordSelection = room.wordSelection;
    if (roomWordSelection[username] !== undefined) {
        res.status(400).send(packError("Word Selection already set"))
        return;
    }
        

    if (!room.players.includes(username))
        res.status(400).send(packError("User not in room"))
    else {
        if (wordLookupTable[word] === undefined)
            res.send(({accepted: false}))
        else {
            room.wordSelection[username] = word
            if (roomReady(room)) {
                room.status = 'ready'
            }
            res.send(({accepted: true}))
        }
    }
});

/*# End Word Selection Page #*/

/*# Start Game Page #*/

app.post("/start-timer", (req, res) => {
    const body = req.body
    if (isEmpty(body)) {
        res.status(400).send(packError("Missing body"))
        return;
    }
    const code = body.code
    const username = body.username
    if (isBlank(code)){
        res.status(400).send(packError("Missing code parameter"))
        return;
    }
    if (isBlank(username)){
        res.status(400).send(packError("Missing username parameter"))
        return;
    }
    const room = getRoom(code)
    if (room === undefined) {
        res.status(500).send(packError("room is undefined"))
        return;
    }
    if (room.times[username].startTime !== undefined) {
        res.status(400).send(packError("startTime already set"))
        return;
    }
    room.times[username].startTime = Date.now()
    res.send({status: "success"})
})

app.post("/guess-word", (req, res) => {
    const body = req.body;
    if (isEmpty(body)) {
        res.status(400).send(packError("Missing body"))
        return;
    }
    const code = body.code
    const username = body.username
    const guess = body.guess
    if (isBlank(code)){
        res.status(400).send(packError("Missing code parameter"))
        return;
    }
    if (isBlank(username)){
        res.status(400).send(packError("Missing username parameter"))
        return;
    }
    if (isBlank(guess)){
        res.status(400).send(packError("Missing guess parameter"))
        return;
    }
    if (wordLookupTable[guess] === undefined) {
        res.status(404).send(packError("Unknown word"))
        return;
    }
    if (guess.length != 5) {
        res.send(400).send(packError("Guess is wrong length"))
        return
    }

    const room = getRoom(code)
    if (room === undefined) {
        res.status(500).send(packError("room is undefined"))
        return;
    }
    const challangeWord = getChallangeWord(room, username)
    if (challangeWord === undefined) {
        res.status(500).send(packError("challangeWord is undefined"))
        return;
    }
    const pattern = evaluate(guess, challangeWord)
    
    bankPattern(pattern, guess, room, username)
    const guessCount = room.states[username].length
    if (winningPattern(pattern)) {
        if (room.winner === undefined) room.winner = username
        room.times[username].endTime === Date.now()
    }
    if (guessCount === 6) {
        room.times[username].endTime === Date.now()
    }
    if (gameOver(room)){
        room.status === "over"
    }
    res.send(({pattern: pattern, count: guessCount}))
});

app.get("/get-opponent-state", (req, res) => {
    const query = req.query
    if (isEmpty(query)) {
        res.status(400).send(packError("Missing query"))
        return;
    }
    const username = query.username
    const code = query.code
    if (isBlank(username)){
        res.status(400).send(packError("Missing username parameter"))
        return;
    }
    if (isBlank(code)){
        res.status(400).send(packError("Missing code parameter"))
        return;
    }
    const room = getRoom(code)
    if (room === undefined) 
        res.status(404).send(packError("Unknown room code"))
    else {
        const opponent = getOpponent(room, username)

        console.log(opponent)
    
        const opponentState = room.states[opponent]
        
        if (opponentState !== undefined)
            res.send((opponentState))
        else
            res.status(404).send(packError("Count not find opponent state"))
    }  
})

app.get("/get-challange-word", (req, res) => {
    const query = req.query
    if (isEmpty(query)) {
        res.status(400).send(packError("Missing query"))
        return;
    }
    const code = query.code
    const username = query.username
    if (isBlank(username)) {
        res.status(400).send(packError("Missing username parameter"))
        return;
    }
    if (isBlank(code)) {
        res.status(400).send(packError("Missing code parameter"))
        return;
    }

    const room = getRoom(code)
    if (room === undefined) 
        res.status(404).send(packError("Unknown room code"))
    else {
        const opponent = getOpponent(room, username)

        const challangeWord = getChallangeWord(room, username)
        res.send(({word: challangeWord}))
    }
});

/*# End Game Page #*/

/**** END ENDPOINTS ****/


module.exports = app
