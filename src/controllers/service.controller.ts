import type { Request, Response } from 'express';
import { Service } from '../models/service.models';
import { Mechanic } from '../models/mechanic.models';

export const getServices = async (req: Request, res: Response) => {
  try {
    const services = await Service.findAll({
      include: [
        {
          model: Mechanic,
          as: 'mechanicData',
        },
      ],
    });

    const formattedServices = services.map((service: any) => ({
      id: service.id,
      name: service.name,
      price: service.price,
      description: service.description,
      visible: service.visible,
      mechanic_id: service.mechanic_id,
      mechanicName: service.mechanicData?.name || '',
    }));

    res.status(200).json(formattedServices);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching services', error });
  }
};
