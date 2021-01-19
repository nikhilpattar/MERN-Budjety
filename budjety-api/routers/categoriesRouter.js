import express from 'express';
import { addCategory, getCategory } from '../controllers/categoriesController.js';

const categoryRouter = express.Router();

categoryRouter.route('/').get(getCategory).post(addCategory);

export default categoryRouter;