import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors())
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("Mongodb Connected"))
.catch((err) => console.log("Mongodb Error",err));

app.listen()


export default app;