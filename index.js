const app = require("./server");
app.listen(3000, () => {
    const host = server.address().address;
    const port = server.address().port;
    console.log("WordDuel running at http://%s:%s", host, port);
})
