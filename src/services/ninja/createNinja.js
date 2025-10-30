
import { Ninja } from '../../model/index.js';

async function createNinja({ name, city, uf }) {
  try {
    const ninja = await Ninja.create({
      name,
      city,
      uf,
    });
    return ninja;
  } catch (error) {
    throw new Error(`Erro ao criar ninja: ${error.message}`);
  }
}

export default createNinja;
