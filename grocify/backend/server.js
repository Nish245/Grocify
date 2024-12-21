import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import {PORT, URI} from "./config/index.js";
import Router from "./routes/index.js";

const server = express();

// Configure header information
server.use(cors());
server.disable("x-powered-by");
server.use(cookieParser());
server.use(express.urlencoded({ extended: false}));
server.use(express.json());

// Configure database
mongoose.promise = global.Promise;
mongoose.set("strictQuery", false);
await mongoose
    .connect(URI, {})
    .then(console.log("Connected to database"))
    .catch((err) => console.log(err));

// Configure routes
Router(server);

// Start server
server.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
);