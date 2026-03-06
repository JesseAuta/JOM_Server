import { Router } from 'express';
import { getBrands, getModelsByBrand } from '../controllers/car.controller';
const router = Router();
router.get('/brands', getBrands);
router.get('/models/:brandId', getModelsByBrand);
export default router;
