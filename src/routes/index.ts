import express from "express";

// Routes
import exampleRoutes from "./example-routes";

const router = express.Router();

export default (): express.Router => {
    exampleRoutes(router);

    return router;
};
