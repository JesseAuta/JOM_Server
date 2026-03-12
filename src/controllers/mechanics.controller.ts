// import { type Request, type Response } from 'express';
// import { Mechanic } from '../models/mechanic.model';

// // GET /api/mechanics
// export const getMechanics = async (req: Request, res: Response) => {
//   try {
//     const mechanics = await Mechanic.findAll();
//     res.json(mechanics); // ⚡ must return an array
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // POST /api/mechanics
// export const createMechanic = async (req: Request, res: Response) => {
//   try {
//     const mechanic = await Mechanic.create(req.body);
//     res.status(201).json(mechanic);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // PUT /api/mechanics/:id
// export const updateMechanic = async (req: Request, res: Response) => {
//   try {
//     const id = Number(req.params.id); // convert to number
//     const mechanic = await Mechanic.findByPk(id);
//     if (!mechanic)
//       return res.status(404).json({ message: 'Mechanic not found' });

//     await mechanic.update(req.body);
//     res.json(mechanic);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // DELETE /api/mechanics/:id
// export const deleteMechanic = async (req: Request, res: Response) => {
//   try {
//     const id = Number(req.params.id); // convert to number
//     const mechanic = await Mechanic.findByPk(id);
//     if (!mechanic)
//       return res.status(404).json({ message: 'Mechanic not found' });

//     await mechanic.destroy();
//     res.status(204).send();
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

import { type Request, type Response } from 'express';
import { Mechanic } from '../models/mechanic.model';

// GET /api/mechanics
export const getMechanics = async (req: Request, res: Response) => {
  try {
    const mechanics = await Mechanic.findAll();
    return res.json(mechanics);
  } catch (err) {
    console.error('Get mechanics error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// POST /api/mechanics
export const createMechanic = async (req: Request, res: Response) => {
  try {
    const { first_name, last_name, phone, specialization } = req.body;

    if (!first_name || !last_name || !phone) {
      return res.status(400).json({
        message: 'first_name, last_name and phone are required',
      });
    }

    const mechanic = await Mechanic.create({
      first_name,
      last_name,
      phone,
      specialization,
    });

    return res.status(201).json(mechanic);
  } catch (err) {
    console.error('Create mechanic error:', err);
    return res.status(500).json({ message: 'Server error', error: err });
  }
};

// PUT /api/mechanics/:id
export const updateMechanic = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const mechanic = await Mechanic.findByPk(id);

    if (!mechanic) {
      return res.status(404).json({ message: 'Mechanic not found' });
    }

    const { first_name, last_name, phone, specialization } = req.body;

    await mechanic.update({
      first_name,
      last_name,
      phone,
      specialization,
    });

    return res.json(mechanic);
  } catch (err) {
    console.error('Update mechanic error:', err);
    return res.status(500).json({ message: 'Server error', error: err });
  }
};

// DELETE /api/mechanics/:id
export const deleteMechanic = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const mechanic = await Mechanic.findByPk(id);

    if (!mechanic) {
      return res.status(404).json({ message: 'Mechanic not found' });
    }

    await mechanic.destroy();
    return res.status(204).send();
  } catch (err) {
    console.error('Delete mechanic error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};
