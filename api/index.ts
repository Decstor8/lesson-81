import cors from 'cors';
import express from 'express';
import mongoose from "mongoose";
import config from "./config";
import linksRouter from "./routers/links";

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());

app.use('/links', linksRouter);

async function launchApp() {
    try {
        await mongoose.connect(config.mongoose.db);
    } catch (error) {
        console.error('Ошибка не удалось подключиться к MongoDB', error);
        process.exit(1);
    }

    app.listen(port, () => {
        console.log(`Сервер стартовал на порту: ${port}`)
    });

    process.on('SIGTERM', async () => {
        await mongoose.disconnect();
        process.exit(0);
    });
}

void launchApp();
