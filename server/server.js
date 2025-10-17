import express from "express"
import dotenv from "dotenv"
import connectToDb from "./config/db.js"
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.js"
import taskRoutes from "./routes/tasks.js"
import cors from "cors"
import { errorHandler, notFound } from "./middleware/errorHandler.js"

dotenv.config()

connectToDb()

const app = express()

app.use(
    cors({
        origin: ["https:locahost:5173"],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);

app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRoutes);
app.use("/api", taskRoutes)

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
