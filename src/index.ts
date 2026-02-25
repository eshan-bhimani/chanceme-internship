import express from "express";
import calculateChanceRouter from "./routes/calculateChance";

const app = express();

app.use(express.json());

app.use("/api/calculate-chance", calculateChanceRouter);

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
