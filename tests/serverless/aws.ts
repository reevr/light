import { light, Route } from '../../src/index';

describe('serverless', () => {
  describe('aws', () => {
    process.env.LIGHT_ENV = 'aws';

    const server: any = light(class Index extends Route {
      public async handler() {
        return {
          hello: 'world',
        };
      }
    });

    it('exports a handler', async () => {
      expect.assertions(3);
      expect(server).toBeTruthy();
      expect(server.handler).toBeTruthy();
      expect(typeof server.handler).toBe('function');
    });
  });
});