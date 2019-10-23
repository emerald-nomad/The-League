import * as express from "express";
import * as mongoose from "mongoose";
import * as bodyParser from "body-parser";

import { test, auth } from "./controllers";

mongoose
  .connect(process.env.MONGO_URI!, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/test", test);
app.use("/api/auth", auth);

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`app is running on port ${port}`);
});
