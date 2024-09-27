import { server } from "../mocks/node";
import { beforeAll, afterEach, afterAll, expect } from "vitest";
import '@testing-library/jest-dom';

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});
