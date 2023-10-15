import path from "path";
import {fileURLToPath} from 'url';
import express from "express";
import compressionMiddleware from "compression";
import { routerMiddleware } from "@marko/run-adapter-node/middleware";
import bodyParser from "body-parser";
import session from 'express-session';

const { NODE_ENV = "development", PORT = 3000 } = process.env;
const __filename = fileURLToPath(import.meta.url);

console.time("Start");
express()
  .use(bodyParser.urlencoded({ extended: true }))
  .use(session({
    secret: 'testetestetesttetestest', // Change this to a more secure value
    resave: true,
    saveUninitialized: true
  }))  
  .use(compressionMiddleware())
  .use("/assets", express.static(path.join(path.dirname(__filename), 'assets')))
  .use(routerMiddleware())
  .listen(PORT, () => {
    console.log("listening");
    console.timeEnd("Start");
    console.log(`Env: ${NODE_ENV}`);
    console.log(`Address: http://localhost:${PORT}`);
  });