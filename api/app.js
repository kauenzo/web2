const express = require("express");
const cors = require("cors");
const app = express();
const routes = require("./routes/router");
const conn = require("./db/conn");
const swaggerUi = require("swagger-ui-express");
const swaggerDoc = require("./swagger.json");

app.use(cors());
app.use(express.json());

// Conexão com o banco
conn();

// Rotas
app.use("/api", routes);
app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.listen(8080, () => {
    console.log("Host in http://localhost:8080");
});