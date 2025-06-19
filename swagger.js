// swagger.js
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Avtomobil Elanları API",
      version: "1.0.0",
      description: "Turbo.az tipli car listing API"
    },
    servers: [
      {
        url: "https://shop-backend-le06.onrender.com",
      },
    ],
  },
  apis: ["./routes/*.js"], // Burada sənədləri harda yazdığını göstər
};

const swaggerSpec = swaggerJSDoc(options);

const setupSwagger = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = setupSwagger;
