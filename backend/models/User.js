import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
    },
    role: {
        type: String,
        enum: ['admin', 'storeManager', 'departmentHead', 'universityAuth', 'staffMember'],
        default: 'staffMember'
    },
    universityID: {
        type: String,
        unique: true,
        sparse: true
    },
    department: {
        type: String,
        default: "General"
    },

});

const User = mongoose.model("user", userSchema);
export default User;