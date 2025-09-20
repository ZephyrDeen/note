import prisma from '../lib/prisma.js';
import findUserByName from '../utils/getUser.js';
import encryptPassword from '../utils/cryption.js';
import postUser from '../utils/postUser.js';

async function register(req, res) {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required.', code: 400 });
    }

    const existingUser = await findUserByName(username);

    if (existingUser) {
      return res.status(409).json({ error: 'Username already exists.', code: 409, username: username });
    }

    const hashedPassword = await encryptPassword(password);

    const newUser = await postUser({ username, password: hashedPassword });

    console.log(newUser);
    res.status(201).json({
      message: 'Register successful',
      code: 201,
      user: newUser
    });
  }
  catch (error) {
    console.log(error);
  }
}

export { register };