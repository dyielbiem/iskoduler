import mongoose from "mongoose";

const MongooseSchema = mongoose.Schema;

const userSchema = new MongooseSchema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    }
})

const user = mongoose.model('user', userSchema, 'users');

export default user;