import { Router } from 'express';
import {
  getMechanics,
  createMechanic,
  updateMechanic,
  deleteMechanic,
} from '../controllers/mechanics.controller';

const router = Router();

router.get('/', getMechanics);
router.post('/', createMechanic);
router.put('/:id', updateMechanic);
router.delete('/:id', deleteMechanic);

export default router;
