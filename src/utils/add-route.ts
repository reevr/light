import { join, parse } from 'path';
import { IncomingMessage, ServerResponse } from 'http';

type IM = IncomingMessage;
type SR = ServerResponse;
type AP = Promise<any>;

import Route from '../types/route';

export default (router: any, route: Route, opts?: any): void => {
  const endpoint = route;

  if (typeof endpoint.path === 'string') {
    endpoint.path = [endpoint.path];
  }

  endpoint.path = endpoint.path.map((p: string): string => {
    const { name } = parse(p);
    return join('/', name);
  });

  // if the path is /index, map it to the root route as well
  if (endpoint.path.includes('/index')) {
    endpoint.path.push('/');
  }

  if (!endpoint.method) {
    endpoint.method = ['GET']; // default to GET
  }

  if (!Array.isArray(endpoint.method)) {
    endpoint.method = [endpoint.method];
  }

  endpoint.method = endpoint.method.map((m: string): string => m.toUpperCase());

  endpoint.path.forEach((path: string): void => {
    router.on(
      endpoint.method,
      path,
      (req: IM, res: SR): AP => endpoint.handler(req, res, opts),
    );
  });
};
