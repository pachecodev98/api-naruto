
import { Ninja } from '../../model/index.js';

async function deleteNinja(id) {
  try {
    const ninja = await Ninja.findByPk(id);
    if (!ninja) {
      return null;
    }
    
    await ninja.destroy();
    return ninja;
  } catch (error) {
    throw new Error(`Erro ao deletar ninja: ${error.message}`);
  }
}

export default deleteNinja;
