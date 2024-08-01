import express from "express";
import bodyParser from "body-parser";
import emailRoutes from "./routes/routes";

const app = express();

app.use(bodyParser.json());
app.use("/api", emailRoutes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
