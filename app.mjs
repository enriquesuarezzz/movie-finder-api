import express from "express";
import cors from "cors";
import "dotenv/config"; // Load environment variables from .env file

import genresRoutes from "./routes/genres.mjs";
import directorsRouter from "./routes/directors.mjs";
import moviesRouter from "./routes/movies.mjs";
import actorsRouter from "./routes/actors.mjs";
import userFavoritesRouter from "./routes/userFavorites.mjs";

const app = express();

app.use(express.json());
app.use(cors());
app.disable("x-powered-by");
app.use("/api", moviesRouter); // Mount the router at /api

app.use("/api/genres", genresRoutes);
app.use("/api/directors", directorsRouter);
app.use("/api/movies", moviesRouter);
app.use("/api/actors", actorsRouter);
app.use("/api/userFavorites", userFavoritesRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
