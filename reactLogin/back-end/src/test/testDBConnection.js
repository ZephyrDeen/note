import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

// 加载 .env 文件中的环境变量
dotenv.config();

const prisma = new PrismaClient();

async function testConnection() {
  try {
    console.log('正在尝试连接数据库...');
    
    // 使用一个不依赖任何数据模型的原生 SQL 查询.
    // SELECT 1 是一个标准且安全的“ping”数据库的方法.
    const result = await prisma.$queryRaw`SELECT 1`;
    
    console.log('✅ 成功! 数据库连接正常.');
    console.log('查询结果:', result);

  } catch (error) {
    console.error('❌ 错误! 连接数据库失败.');
    console.error(error);
    process.exit(1); // 以错误码退出进程
  } finally {
    // 确保无论成功或失败，最后都安全地断开数据库连接.
    await prisma.$disconnect();
    console.log('数据库连接已关闭.');
  }
}

testConnection();