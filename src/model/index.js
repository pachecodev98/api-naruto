import 'dotenv/config';
import { fileURLToPath } from 'url';
import sequelize from '../config/database.js';
import Ninja from './ninja/Ninja.js';
import Aldeia from './aldeia/Aldeia.js';
import User from './user/User.js';

// Relacionamentos
// Definir belongsTo primeiro (do modelo que tem a foreign key)
Aldeia.belongsTo(Ninja, {
  foreignKey: {
    name: 'ninjaId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  as: 'Ninja',
});

// Depois definir hasMany (do modelo pai)
Ninja.hasMany(Aldeia, {
  foreignKey: {
    name: 'ninjaId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  as: 'Aldeias',
});

async function syncDatabase() {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexão com o banco de dados estabelecida com sucesso.');
    
    await sequelize.sync({ alter: true });
    console.log('✅ Modelos sincronizados com o banco de dados.');
  } catch (error) {
    console.error('❌ Erro ao conectar ou sincronizar o banco:', error);
    throw error;
  }
}

// Verifica se este arquivo está sendo executado diretamente
const isMainModule = process.argv[1] && (
  process.argv[1].replace(/\\/g, '/').endsWith('index.js') ||
  process.argv[1].replace(/\\/g, '/').includes('model/index.js')
);

if (isMainModule) {
  syncDatabase().then(() => {
    console.log('🎯 Sincronização concluída.');
    process.exit(0);
  }).catch((error) => {
    console.error('❌ Erro na sincronização:', error);
    process.exit(1);
  });
}

export { sequelize, Ninja, Aldeia, User };
