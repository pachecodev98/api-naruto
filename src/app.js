
import express from 'express';
import cors from 'cors';
import routerNinja from './routers/ninjaRouter.js';
import routerUser from './routers/userRouter.js';

const app = express();

// Middlewares globais
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({
    message: '🍥 Naruto API',
    version: '1.0.0',
    status: 'online',
  });
});


app.use(routerUser);
app.use(routerNinja);

app.use((req, res) => {
  res.status(404).json({
    message: 'Rota não encontrada',
  });
});

export default app;
