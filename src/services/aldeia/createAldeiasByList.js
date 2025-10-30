

import createAldeia from './createAldeia.js';

async function createAldeiasByList(aldeias, ninjaId) {
  const results = {
    success: [],
    error: [],
  };

  for (const aldeiaName of aldeias) {
    try {
      const aldeia = await createAldeia({
        name: aldeiaName,
        ninjaId,
      });
      results.success.push(aldeia);
    } catch (error) {
      results.error.push({
        name: aldeiaName,
        error: error.message,
      });
    }
  }

  return results;
}

export default createAldeiasByList;
