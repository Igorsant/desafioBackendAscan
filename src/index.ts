import express from "express";
import cors from "cors";
import Resolver from "./routes";
import { receiver } from "./rabbitmq/receive";

const app = express();

Resolver(app);

app.use(cors());
app.use(express.json());
app.listen(2000);

receiver();
