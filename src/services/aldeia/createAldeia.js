

import { Aldeia } from '../../model/index.js';

async function createAldeia({ name, ninjaId }) {
  try {
    const aldeia = await Aldeia.create({
      name,
      ninjaId,
    });
    return aldeia;
  } catch (error) {
    throw new Error(`Erro ao criar aldeia: ${error.message}`);
  }
}

export default createAldeia;
