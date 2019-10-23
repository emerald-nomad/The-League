import * as express from "express";
import * as bodyParser from "body-parser";

import { test } from "./controllers";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/test", test);

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log("app is running on port 4000");
});
