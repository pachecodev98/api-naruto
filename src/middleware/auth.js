
import { User } from '../model/index.js';

async function authMiddleware(req, res, next) {
  try {
    const token = req.headers['x-api-key'];

    if (!token) {
      return res.status(401).json({
        message: 'Token não fornecido. Use o header x-api-key',
      });
    }

   
    const user = await User.findOne({ where: { token } });

    if (!user) {
      return res.status(401).json({
        message: 'Token inválido ou usuário não encontrado',
      });
    }

   
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      message: 'Erro na autenticação',
      error: error.message,
    });
  }
}

export default authMiddleware;
