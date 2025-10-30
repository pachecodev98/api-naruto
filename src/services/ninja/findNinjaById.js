
import { Ninja, Aldeia } from '../../model/index.js';

async function findNinjaById(id) {
  try {
    const ninja = await Ninja.findByPk(id, {
      include: [
        {
          model: Aldeia,
          as: 'Aldeias',
        },
      ],
    });
    return ninja;
  } catch (error) {
    throw new Error(`Erro ao buscar ninja: ${error.message}`);
  }
}

export default findNinjaById;
