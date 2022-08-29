import express from "express";
import cors from "cors";
import Resolver from "./routes";
import { receiver } from "./rabbitmq/receive";

const app = express();

app.use(cors());
app.use(express.json());

Resolver(app);

app.listen(2000);

receiver();
