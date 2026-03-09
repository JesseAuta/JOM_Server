import type { Request, Response } from 'express';
import { CarBrand } from '../models/carBrand.model';
import { CarModel } from '../models/carModel.model';

export const getBrands = async (req: Request, res: Response) => {
  try {
    const brands = await CarBrand.findAll();
    res.status(200).json(brands);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching brands', error });
  }
};

export const getModelsByBrand = async (req: Request, res: Response) => {
  try {
    const models = await CarModel.findAll({ where: { brand_id: req.params.brandId } });
    res.status(200).json(models);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching models', error });
  }
};
