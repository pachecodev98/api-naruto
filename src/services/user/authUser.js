
import bcrypt from 'bcrypt';
import { User } from '../../model/index.js';

async function authUser({ email, password }) {
  try {
    const user = await User.findOne({ where: { email } });
    
    if (!user) {
      return null;
    }
    

    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      return null;
    }
    
    return user;
  } catch (error) {
    throw new Error(`Erro ao autenticar usuário: ${error.message}`);
  }
}

export default authUser;
