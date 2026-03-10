// import { Router } from 'express';
// import { getServices } from '../controllers/service.controller';
// const router = Router();
// router.get('/', getServices);
// export default router;
import { Router } from 'express';
import {
  getServices,
  createService,
  updateService,
  deleteService,
} from '../controllers/admin_service.controller';

const router = Router();

router.get('/', getServices); // GET all services
router.post('/', createService); // CREATE service
router.put('/:id', updateService); // UPDATE service by id
router.delete('/:id', deleteService); // DELETE service by id

export default router;
