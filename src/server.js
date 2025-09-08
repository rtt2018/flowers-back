import express from "express";
import cors from "cors";
import pino from "pino-http";
import cookieParser from "cookie-parser";
import router from "./routers/index.js";
import ingredientsRouter from "./routers/ingredients.js";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../docs/swagger.json" with { type: "json" };
import { errorHandler } from "./middlewares/errorHandler.js";
import { notFoundHandler } from "./middlewares/notFoundHandler.js";
import categoriesRouter from "./routers/categories.js";

export const setupServer = () => {
  const app = express();

  app.use(cors());
  app.use(cookieParser());
  app.use(
    pino({
      transport: {
        target: "pino-pretty",
      },
    })
  );
  app.use(express.json());

  app.use("/api/ingredients", ingredientsRouter);
  app.use("/api/categories", categoriesRouter);
  app.use("/api", router);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  app.use(notFoundHandler);
  app.use(errorHandler);

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
