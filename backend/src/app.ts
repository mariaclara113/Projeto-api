import express from 'express';
import { swaggerSpec, swaggerUi } from './swagger';
import pontoRoutes from './routes/ponto';
import projetoRoutes from './routes/projeto';
import extensionistaRoutes from './routes/extensionista';

const app = express();
app.use(express.json());

// Rotas
app.use('/ponto', pontoRoutes);
app.use('/projeto', projetoRoutes);
app.use('/extensionista', extensionistaRoutes);

// Swagger
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;
