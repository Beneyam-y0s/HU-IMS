import bcrypt from "bcrypt";
import user from "./models/User.js";
import connectDB from "./db/connections.js";

const register = async () =>{
    try{
        connectDB();
        const hashPassword = await bcrypt.hash("admin123", 10);
        const newUser = new user({
            name: "admin",
            email: "Haramaya University",
            role: "admin",
            universityId: "A001",
        })
        await newUser.save();
        console.log("Admin user created successfully");
    }catch(error){
        console.log(error);
    }
}

register();