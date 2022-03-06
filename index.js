const app = require("./server");
require("dotnet").consfig()
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log("WordDuel running at 3000");
})
