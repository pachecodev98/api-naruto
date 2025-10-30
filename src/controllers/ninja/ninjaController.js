

import createNinja from '../../services/ninja/createNinja.js';
import findNinjaById from '../../services/ninja/findNinjaById.js';
import findAllNinjas from '../../services/ninja/findAllNinjas.js';
import updateNinja from '../../services/ninja/updateNinja.js';
import deleteNinja from '../../services/ninja/deleteNinja.js';
import createAldeiasByList from '../../services/aldeia/createAldeiasByList.js';


export async function createNinjaController(req, res) {
  try {
    const { name, city, uf, aldeias } = req.body;

    
    if (!name || !city || !uf) {
      return res.status(400).json({
        message: 'Nome, UF e cidade são obrigatórios',
      });
    }

   
    const ninja = await createNinja({ name, city, uf });

    
    let aldeiaCreate = { success: [], error: [] };
    if (aldeias && Array.isArray(aldeias) && aldeias.length > 0) {
      aldeiaCreate = await createAldeiasByList(aldeias, ninja.id);
    }

    return res.status(201).json({
      data: ninja,
      aldeiaCreate,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
}


export async function getNinjaByIdController(req, res) {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        message: 'ID é obrigatório',
      });
    }

    const ninja = await findNinjaById(id);

    if (!ninja) {
      return res.status(404).json({
        message: 'Ninja não encontrado',
      });
    }

    return res.status(200).json({
      data: ninja,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
}


export async function getAllNinjasController(req, res) {
  try {
    const ninjas = await findAllNinjas();

    return res.status(200).json({
      data: ninjas,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
}


export async function updateNinjaController(req, res) {
  try {
    const { id } = req.params;
    const data = req.body;

    const ninja = await updateNinja(id, data);

    if (!ninja) {
      return res.status(400).json({
        message: 'Não foi possível atualizar',
      });
    }

    return res.status(200).json({
      message: 'Atualizado com sucesso',
      ninja,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
}


export async function deleteNinjaController(req, res) {
  try {
    const { id } = req.params;

    const ninja = await deleteNinja(id);

    if (!ninja) {
      return res.status(400).json({
        message: 'Erro na operação',
      });
    }

    return res.status(200).json({
      message: 'Deletado com sucesso',
      ninja,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
}
