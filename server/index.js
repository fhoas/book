import express from "express";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
app.use(express.json());
dotenv.config();

const corsConfig = {
  origin: "*",
  credential: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
};
app.options("", cors(corsConfig));
app.use(cors(corsConfig));


app.use(
  cors({
    origin: "https://mern-bookbase-client.vercel.app",
  })
);

app.get("/", (req, res) => {
  res.send("server is running");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Internal Server Error");
});

app.use("/books", booksRoute);

mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(4800, () => {
      console.log(`App is listening to port: 4800`);
    });
    console.log("App connected to database");
  })
  .catch((error) => {
    console.log(error);
  });
