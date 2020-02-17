import { useRoute } from '../../index';

describe('serverless', () => {
  describe('aws', () => {
    process.env.LIGHT_ENV = 'aws';

    const { withHandler } = useRoute('aws');
    const server: any = withHandler(() => ({
      hello: 'world',
    }));

    it('exports a handler', async () => {
      expect.assertions(3);
      expect(server).toBeTruthy();
      expect(server.handler).toBeTruthy();
      expect(typeof server.handler).toBe('function');
    });
  });
});