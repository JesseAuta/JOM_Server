// src/controllers/service.controller.ts
import { type Request, type Response } from 'express';
import { Service } from '../models/service.model';

// GET all services
export const getServices = async (req: Request, res: Response) => {
  try {
    const services = await Service.findAll();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching services', error });
  }
};

// POST create new service
export const createService = async (req: Request, res: Response) => {
  try {
    const { name, price, description } = req.body;
    if (!name) return res.status(400).json({ message: 'Name is required' });

    const service = await Service.create({ name, price, description });
    res.status(201).json(service);
  } catch (error) {
    res.status(500).json({ message: 'Error creating service', error });
  }
};

// PUT update service
export const updateService = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, price, description } = req.body;

    const service = await Service.findByPk(id);
    if (!service) return res.status(404).json({ message: 'Service not found' });

    service.name = name ?? service.name;
    service.price = price ?? service.price;
    service.description = description ?? service.description;

    await service.save();
    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ message: 'Error updating service', error });
  }
};

// DELETE service
export const deleteService = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const service = await Service.findByPk(id);
    if (!service) return res.status(404).json({ message: 'Service not found' });

    await service.destroy();
    res.status(200).json({ message: 'Service deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting service', error });
  }
};
