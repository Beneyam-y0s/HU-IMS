import express from 'express';
import cors from 'cors';
import connectDB from './db/connections.js';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/userRoutes.js';



const app = express();
app.use(cors());
app.use(express.json());


app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is up baby😎 (${PORT})`);
});

app.get("/test", (req, res) => {
  res.send("SERVER IS WORKING");
});

