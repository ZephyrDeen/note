import prisma from '../lib/prisma.js';

async function findUserByName(username) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username: username
      }
    });
    return user;
  } catch (error) {
    console.log(error)
    throw error;
  }
}

export default findUserByName;