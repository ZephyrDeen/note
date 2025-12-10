import bcrypt from 'bcryptjs';
import prisma from '../lib/prisma.js';

async function encryptPassword(password) {
  try {
    // 1. Fetch the salt rounds configuration from the database.
    const bcryptConfig = await prisma.bcrypt.findUnique({
      where: { id: '1' },
    });

    if (!bcryptConfig) {
      // This is a critical server configuration error.
      throw new Error('Bcrypt salt rounds configuration not found in the database.');
    }

    // 2. Hash the password using the fetched salt rounds and return the result.
    const hashedPassword = await bcrypt.hash(password, bcryptConfig.saltRounds);
    return hashedPassword;
  } catch (error) {
    // Log the specific error for debugging and then re-throw it so that the 
    // global error handler in the route can catch it and send a proper response.
    console.error("Error during password encryption in cryption.js:", error);
    throw error;
  }
}

export default encryptPassword;
