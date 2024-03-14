import { Request, Response, NextFunction } from 'express';
import { config } from './config';

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const password = req.headers.authorization;
  if (!password) {
    res.status(401).send({ message: 'Unauthorized'});
    return;
  }
  if (password !== config.password) {
    res.status(401).send({ message: 'Unauthorized'});
    return;
  }
  next();
}