import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { login } from './src/api/login.js';
import { register } from './src/api/register.js';
import { notesRouter } from './src/api/notes.js';
import prismaClientPackage from '@prisma/client';
const { Prisma } = prismaClientPackage;
import { authToken } from './src/utils/authToken.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/health', (req, res) => {
  res.status(200).json({ message: 'Server is running' });
});

app.post('/api/login', authToken, login);
app.post('/api/register', register);
app.use('/api/notes', notesRouter);

// 专门用于验证 token 的路由
app.get('/api/verify-token', authToken, (req, res) => {
  // 如果能到达这里，说明 authToken 中间件验证通过
  res.status(200).json({
    code: 200,
    message: 'Token is valid',
    username: req.body.username
  });
});

// Global Error Handling Middleware
// This must be placed after all your routes.
app.use((err, req, res, next) => {
  console.error(err); // Log the error for debugging purposes

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    // Handle known Prisma errors
    switch (err.code) {
      case 'P2002':
        // Unique constraint failed
        // e.g., trying to register with an email that already exists
        return res.status(400).json({
          error: `A user with this ${err.meta.target.join(', ')} already exists.`,
        });
      // Add more specific Prisma error codes as needed
      // case 'P2025':
      //   return res.status(404).json({ error: 'Record to delete does not exist.' });
      default:
        return res.status(400).json({ error: 'Database error.', code: err.code });
    }
  }

  // Handle other types of errors (e.g., validation errors) here if you have them

  // Fallback for unexpected errors
  return res.status(500).json({ error: 'Internal Server Error' });
});

const port = process.env.PORT || 9090;

// 本地开发时启动服务器
if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

// Vercel Serverless 导出
export default app;