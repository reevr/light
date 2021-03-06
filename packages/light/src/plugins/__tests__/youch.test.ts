import fetch from 'node-fetch';

import { createTest, createRoute } from '../../index';

const { route } = createRoute('test');
const { listen, close } = createTest(route(() => {
  throw new Error('hi');
}), {
  dev: true,
});
let url: any;

beforeEach(async () => {
  url = await listen();
});

afterEach(async () => {
  close();
});

describe('plugins', () => {
  describe('youch', () => {
    describe('in dev mode', () => {
      it('youches the error', async () => {
        expect.assertions(3);
        const spy = jest.spyOn(console, 'log').mockImplementation();
        const req = await fetch(url);
        const res = await req.text();
        expect(req.status).toStrictEqual(200);
        expect(res).toContain('html');
        expect(spy).toHaveBeenCalledTimes(1);
        spy.mockRestore();
      });
    });
  });
});
