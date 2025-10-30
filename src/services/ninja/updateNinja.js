
import { Ninja } from '../../model/index.js';

async function updateNinja(id, data) {
  try {
    const ninja = await Ninja.findByPk(id);
    if (!ninja) {
      return null;
    }
    
    await ninja.update(data);
    return ninja;
  } catch (error) {
    throw new Error(`Erro ao atualizar ninja: ${error.message}`);
  }
}

export default updateNinja;
