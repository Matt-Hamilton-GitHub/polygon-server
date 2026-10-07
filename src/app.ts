import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import connectToOakLine from './config/mongoDB';
import oaklineRoutes from './routes/oaklineRoutes';

connectToOakLine();

const app = express();

// Middleware
app.use(cors());
app.use(helmet()); // sets secure HTTP headers
app.use(express.json());

app.use('/api/v2/', oaklineRoutes);

export default app;