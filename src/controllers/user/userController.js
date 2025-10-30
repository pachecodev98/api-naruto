
import createUser from '../../services/user/createUser.js';
import authUser from '../../services/user/authUser.js';


export async function createUserController(req, res) {
  try {
    const { name, email, password } = req.body;

   
    if (!name || !email || !password) {
      return res.status(400).json({
        message: 'Os campos name, email e password são obrigatórios',
      });
    }

   
    const { token } = await createUser({ name, email, password });

    return res.status(201).json({
      token,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
}


export async function authUserController(req, res) {
  try {
    const { email, password } = req.body;

    
    if (!email || !password) {
      return res.status(400).json({
        message: 'Email e senha obrigatórios',
      });
    }

  
    const user = await authUser({ email, password });

    if (!user) {
      return res.status(401).json({
        message: 'Email ou senha inválidos',
      });
    }

    return res.status(200).json({
      message: 'Login realizado com sucesso',
      token: user.token,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
}
