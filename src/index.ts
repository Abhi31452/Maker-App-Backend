import { Application, Response, Request } from "express";
import * as express from "express";
import * as  dotenv from "dotenv";
import { connection } from "./connectDB/connectMongoDb";
import { route } from './routes/routes'
const Cors = require("cors");


const app: Application = express();
dotenv.config();

app.use(express.json());

app.use(Cors());

app.listen(process.env.PORT, () => {
    connection();
    console.log(" Server Running in port  : ", process.env.PORT)
})

app.use("/api", route);

app.get("/", (req: Request, res: Response) => {
    console.log(" Welcome ");
})


