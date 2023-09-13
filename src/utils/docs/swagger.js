import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import config from "../../config/config.js";
import { logger } from "../../helpers/logger.js";

/* The `options` object is used to configure the Swagger documentation for the API. */

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Notes API",
      version: "1.0.0",
    },
    components: {
      securitySchemes: {
        type: "apiKey",
        name: "accessToken",
        in: "cookie",
      },
    },
    security: {
      api_key: [],
    },
  },
  apis: [
    "./src/routes/*.js",
    "./src/services/validations/schemas/*.js",
    "./src/models/*.js",
  ],
};

/* The line `const specs = swaggerJsdoc(options);` is creating a Swagger specification object based on
the provided options. */

const specs = swaggerJsdoc(options);

/**
 * The function sets up Swagger documentation for an Express app and provides a route to access the
 * Swagger JSON file.
 *
 * @param app - The "app" parameter is an instance of the Express application. It is used to define
 * routes and middleware for the application.
 */

export default function swaggerDocs(app) {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));

  app.get("/swagger.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(specs);
  });

  logger.info(`Docs available at http://localhost:${config.port}/docs`);
}
