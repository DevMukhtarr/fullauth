import mongoose from "mongoose";

const User = new mongoose.Schema({
    first_name: {type: String, default: null},
    last_name: {type: String, default: null},
    email: {type: String, default: null},
    password: {type: String, default: null},
})

export default mongoose.model("user", User);