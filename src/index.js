import express from "express";
import bfhlRouter from "./routes/bfhl.js";
import errorHandler from './middleware/error.js';
const app = express();
const PORT = process.env.PORT;

app.use(express.json({ limit: "1mb" })); 

app.get("/health", (req, res) => {
  res.status(200).json({
    is_success: true,
    official_email: "sudhanshu4818.be23@chitkara.edu.in"
  });
});

app.use("/", bfhlRouter);

app.use((req, res) => {
  res.status(404).json({
    is_success: false,
    message: "Endpoint not found"
  });
});


app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running → http://localhost:${PORT}`);
  console.log(`Health: http://localhost:${PORT}/health`);
  console.log(`POST:  http://localhost:${PORT}/bfhl`);
});
