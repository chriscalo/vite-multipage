import express from "express";
import { app } from "./src/api/index.js";
import notFound from "./src/api/404.js";

app.use(express.static("dist"));
app.use(notFound);
app.listen(process.env.PORT || 3000);
