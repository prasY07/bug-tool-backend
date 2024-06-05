import express from "express";
import { config as configDotenv } from 'dotenv';
import mongoose from 'mongoose';
import adminApiRoutes from "./routes/admin.js";
import cors from 'cors';
import webRoutes from "./routes/user.js";

const app = express();
configDotenv();

app.use(cors());
app.use(express.json());
app.use('/api/admin/',adminApiRoutes);
app.use('/api/user/',webRoutes);

const dbString = process.env.dbString;
await mongoose.connect(dbString)
    .then(() => {
        console.log('Connected to database');
        app.listen(5000, () => {
            console.log('Server is running on port 5000');
        });
    })
    .catch((err) => {
        console.log('Database connection error:', err);
    });


// prashanty
// a123Dmin