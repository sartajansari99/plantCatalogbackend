import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

import adminRouter from "./routes/admin.routes.js";
import getPlants from "./routes/getPlant.routes.js";

app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/plants", getPlants);

export { app };
