// Modules
import * as express from "express";
import * as bodyParser from "body-parser";
import * as methodOverride from "method-override";
import * as env from "dotenv";
// Controllers
import UserControllers from "./controllers/user";
import CompanyControllers from "./controllers/company";
import ServicesControllers from "./controllers/services";
// Error handlers
import { notFoundHandler, errorHandler } from "./error";

const app = express();
const PORT = 3000;

// Settings
env.config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// Register controllers
app.use("/api/user", UserControllers);
app.use("/api/company", CompanyControllers);
app.use("/api/services", ServicesControllers);

// Error handles must be define after routes!
app.use(notFoundHandler);
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
