import express from 'express';
import {reportFilter} from '../controllers/reportController.js';

const reportRouter = express.Router();

reportRouter.route('/:uId').post(reportFilter);

export default reportRouter;