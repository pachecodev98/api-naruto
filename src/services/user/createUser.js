
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { User } from '../../model/index.js';

async function createUser({ name, email, password }) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const timestamp = Date.now().toString();
    const token = crypto.createHash('md5').update(timestamp).digest('hex');
    
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      token,
    });
    
    return { user, token };
  } catch (error) {
    throw new Error(`Erro ao criar usuário: ${error.message}`);
  }
}

export default createUser;
