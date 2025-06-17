const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Avtomobil Elanları API",
      version: "1.0.0",
      description: "Avtomobil elanları üçün CRUD API",
    },
    servers: [
      {
        url: "http://localhost:4000",
      },
    ],
  },
  apis: ["./routes/*.js"], // 👉 sənədləri bu fayllardan çəkəcək
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
