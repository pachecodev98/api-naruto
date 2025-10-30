

import { Ninja, Aldeia } from '../../model/index.js';

async function findAllNinjas() {
  try {
    const ninjas = await Ninja.findAll({
      include: [
        {
          model: Aldeia,
          as: 'Aldeias',
        },
      ],
    });
    return ninjas;
  } catch (error) {
    throw new Error(`Erro ao listar ninjas: ${error.message}`);
  }
}

export default findAllNinjas;
