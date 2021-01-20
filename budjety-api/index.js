import express from 'express';
import loginController from './controllers/loginController.js';
import registerController from './controllers/registerController.js';
import expenseRouter from './routers/expenseRouter.js';
import categoryRouter from './routers/categoriesRouter.js';
import reportRouter from './routers/reportRouter.js';
import authorization from './middleware/authorise.js';
import mongoose from 'mongoose';
import cors from 'cors';
import incomeRouter from './routers/incomeRouter.js';

const app = express();
app.use(cors());
app.use(express.json());

//app.use(authorization);

app.use('/login', loginController);

app.use('/register', registerController);

app.use('/report', reportRouter);

app.use('/categories', categoryRouter)

app.use('/expense', expenseRouter);

app.use('/income', incomeRouter);

mongoose.connect('mongodb://localhost:27017/budjety', { useNewUrlParser: true,useUnifiedTopology: true},
    () => console.log('Mongodb Connected'));

app.listen(3800, '0.0.0.0', () => console.log('Server is Running'))
