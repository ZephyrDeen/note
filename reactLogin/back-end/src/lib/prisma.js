import prismaClientPackage from '@prisma/client';

const { PrismaClient } = prismaClientPackage;

// This is a best practice to ensure you only have one instance
// of PrismaClient in your application.
const prisma = new PrismaClient();

export default prisma;