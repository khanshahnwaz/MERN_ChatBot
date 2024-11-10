import express from 'express';
import { config } from 'dotenv';
config();
// app holds the functionality of express
const app = express();
// middlewwares
app.use(express.json());
export default app;
//# sourceMappingURL=app.js.map