import { Router } from 'express';
import { UserController } from '../controller/user.controller';

const router = Router();

router.get('/', UserController.list);
router.post('/find', UserController.findUser); // POST /api/users/find → tìm user theo keyword
router.post('/', UserController.create);
router.get('/:id', UserController.get);
router.put('/:id', UserController.update);
router.delete('/:id', UserController.remove);

export default router;
