import { NationController } from '@/controller/nation.controller';
import { Router } from 'express';

const nationRouter = Router();

nationRouter.get('/', NationController.getlist);

export default nationRouter;
