// server/server.js
import dotenv from "dotenv";
dotenv.config();

import { createApp } from "./app.js";

const PORT = process.env.PORT || 4000;
const HOST = process.env.HOST || "0.0.0.0";

createApp().listen(PORT, HOST, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
