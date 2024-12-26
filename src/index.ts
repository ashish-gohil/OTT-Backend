import express from "express";
import router from "./routes";
import connectDB from "./db/connection";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api", router);

app.listen(PORT, async () => {
  console.log(`Server is running on ${PORT}`);
  console.log("connecting mongo database");
  await connectDB();
});
