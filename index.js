import "dotenv/config";
import app from "./app.js";

const PORT = process.env.PORT || 8080

app.get('/', (req, res) =>{
    res.send("Welcome to Full authentication app")
})

app.listen(PORT, () =>{
    console.log(`app is listening on port ${PORT}`)
})