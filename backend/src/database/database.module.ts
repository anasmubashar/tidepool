import { Module, Global, Logger } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as net from 'net';

const logger = new Logger('DatabaseModule');

function isPortOpen(host: string, port: number, timeout = 1000): Promise<boolean> {
  return new Promise((resolve) => {
    const socket = new net.Socket();
    let status = false;

    socket.setTimeout(timeout);
    socket.once('connect', () => {
      status = true;
      socket.destroy();
      resolve(true);
    });
    socket.once('timeout', () => {
      socket.destroy();
      resolve(false);
    });
    socket.once('error', () => {
      resolve(false);
    });
    socket.connect(port, host);
  });
}

let memoryServerInstance: any = null;

export async function getMongoUri(): Promise<string> {
  if (process.env.MONGODB_URI) {
    logger.log(`Connecting to MONGODB_URI: ${process.env.MONGODB_URI}`);
    return process.env.MONGODB_URI;
  }

  // Check if standard MongoDB is listening on localhost:27017
  const portOpen = await isPortOpen('127.0.0.1', 27017, 800);
  if (portOpen) {
    const defaultUri = 'mongodb://127.0.0.1:27017/smallweb';
    logger.log(`Local MongoDB detected at 127.0.0.1:27017. Using ${defaultUri}`);
    return defaultUri;
  }

  // Fallback to embedded MongoMemoryServer for instant zero-config running
  logger.warn('No external MongoDB detected. Initializing embedded MongoMemoryServer...');
  if (!memoryServerInstance) {
    const { MongoMemoryServer } = await import('mongodb-memory-server');
    memoryServerInstance = await MongoMemoryServer.create({
      instance: {
        dbName: 'smallweb',
      },
    });
  }
  const memUri = memoryServerInstance.getUri();
  logger.log(`Embedded MongoDB initialized at: ${memUri}`);
  return memUri;
}

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async () => {
        const uri = await getMongoUri();
        return {
          uri,
        };
      },
    }),
  ],
  exports: [MongooseModule],
})
export class DatabaseModule {}
