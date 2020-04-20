import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import indexRoutes from './routes/indexRoutes';
import path from 'path';

const app = express();

// settings
app.set('port', 4000);

// middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

//routes
app.use('/api', indexRoutes);

// this folder for application will be used to store public files
app.use('/uploads', express.static(path.resolve('uploads')));


export default app;