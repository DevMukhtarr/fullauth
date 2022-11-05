import express from 'express'
import connect from "./config/connect.js";
import authroute from "./routes/authroute.js"
const app = express()

app.use(
    express.urlencoded({
      extended: false,
    })
  );
  
app.use(express.json());

app.use(authroute)

connect.connectToLocalMongoDB()

export default app