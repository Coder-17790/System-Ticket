import { RoleController } from '@/controller/role.controller';
import { Router } from 'express';

const roleRouter = Router();

roleRouter.get('/', RoleController.list);

export default roleRouter;
