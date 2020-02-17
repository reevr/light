/* eslint-disable no-undef, import/prefer-default-export */

interface Route {
  path: string;
  handler: any;
  location?: string;
}

interface Options {
  dev?: boolean;
  requestLogger?: boolean;
  errorHandler?: boolean;
}

interface TestOptions {
  dev?: boolean;
  requestLogger?: boolean;
  errorHandler?: boolean;
  path?: string;
}

export { Route, Options, TestOptions };
