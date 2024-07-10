import express from 'express';
import session from "express-session";
import logger from 'jet-logger';
import cors from "cors";
import passport from "passport";

import path from 'path';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

import api from './api';

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());
app.use(cookieParser());

if (process.env.NODE_ENV !== "production") {
    app.use(morgan('dev'));
}

app.use(session({ secret: "keyboard cat", resave: false, saveUninitialized: false }));
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());

app.use(cors());
app.use("/api", api);
app.use("/js", express.static(path.resolve(__dirname, "./public/js")));
app.use("/images", express.static(path.resolve(__dirname, "./public/images")));
app.use("/", (req, res)=>{
    res.status(200).sendFile(path.join(__dirname, "./public/index.html"));
});

const port = process.env.PORT|| 5000;
const SERVER_START_MSG = ('Express server started on port: ' + port);
const server = app.listen(port, () =>{
    logger.info(SERVER_START_MSG);
});

process.on('uncaughtException', (err) => {
    console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    console.log(err);
    process.exit(1);});

/*process.on('unhandledRejection', (err: any) => {
    console.log('UNHANDLED REJECTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});*/

process.on('SIGTERM', () => {
    console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
    server.close(() => {
        console.log('💥 Process terminated!');
    });
});