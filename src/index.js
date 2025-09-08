import { setupServer } from "./server.js";
import { initMongoConnection } from "./db/connection.js";
import "dotenv/config";

const start = async () => {
  await initMongoConnection();
  setupServer();
};

start();
