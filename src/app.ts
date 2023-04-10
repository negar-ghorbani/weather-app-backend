import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { default as APIRoutes } from './apis';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(cors({ origin: '*' }))
const port = process.env.PORT;
app.use(express.json());
app.use('/api', APIRoutes);

app.get('/', async (req: Request, res: Response) => {
    res.json({ status: "Healthy!" }).end();
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});

export default app;