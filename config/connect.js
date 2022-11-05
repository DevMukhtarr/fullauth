import mongoose from "mongoose";
import "dotenv/config";

const connect = {
    connectToLocalMongoDB : () =>{
        mongoose
          .connect(process.env.MONGO_URI_LOCAL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          })
          .then(() => console.log("DB Connected!"))
          .catch((err) => {
            console.log("not able to connect to database"+ err);
          });
    }
}

export default connect;