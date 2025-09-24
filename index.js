import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes  from './routes/user.js'
import ticketRoutes from './routes/ticket.js'
import {serve} from "inngest/express"
import inngest from "./inngest/client.js";
import {onUserSignup} from "./inngest/function/on-signup.js"
import {onTicketCreate} from "./inngest/function/on-ticket-create.js"
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors())
app.use(express.json());

app.use('/api/user',userRoutes);
app.use('/api/ticket',ticketRoutes);
app.use("/api/inngest",serve({
    client: inngest,
    functions:[onUserSignup,onTicketCreate]
}));

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("Mongodb Connected"))
.catch((err) => console.log("Mongodb Error",err));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


export default app;