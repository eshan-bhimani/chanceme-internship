import express from "express";
import calculateChanceRouter from "./routes/calculateChance";

const app = express();

app.use(express.json());

app.use("/api/calculate-chance", calculateChanceRouter);

app.get("/", (_req, res) => {
  res.json({ status: "ok", message: "API server is running. Visit http://localhost:5173 for the UI." });
});

const PORT = process.env.PORT ?? 3001;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;
