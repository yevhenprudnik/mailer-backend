import { IncomingMessage } from 'node:http';
import { Mailer } from './mailer';

interface ApiException {
  badRequest(message?: string): void;
  unauthorized(message?: string): void;
  forbidden(message?: string): void;
  notFound(message?: string): void;
}

interface Utils {
  hashPassword(password: string): string;
  checkPassword(password: string, hash: string): boolean;
  receiveArgs(req: IncomingMessage): Promise<any> ;
  exception: ApiException;
  mailer: Mailer
}

export function init(): Utils;
