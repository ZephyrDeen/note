import bcrypt from 'bcryptjs';
import findUserByName from '../utils/getUser.js';
import { genToken } from '../utils/genToken.js';

async function login(req, res) {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required', code: 400 });
    }
    const user = await findUserByName(username);
    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password', code: 401 })
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid username or password', code: 401 })
    }

    const token = genToken({
      username, password
    }, process.env.TOKEN_EXPIRE_TIME || '1h');

    return res.status(200).json({
      message: 'Login successful',
      code: 200,
      username,
      token
    });
  } catch (error) {
    console.log(error);
  }
}

export { login };