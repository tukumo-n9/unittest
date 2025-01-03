import { greet } from "./greet";

test("モック関数は実行された", () => {
  const mockFn = jest.fn();
  mockFn();
  expect(mockFn).toBeCalled();
});

test("モック関数は実行された回数を記録している", () => {
  const mockFn = jest.fn();
  mockFn();
  expect(mockFn).toHaveBeenCalledTimes(1);
  mockFn();
  expect(mockFn).toHaveBeenCalledTimes(2);
});

test("モック関数は実行時の引数を記録している", () => {
  const mockFn = jest.fn();
  function greet(message: string) {
    mockFn(message);
  }
  greet("Hello");
  expect(mockFn).toHaveBeenCalledWith("Hello");
});

test("モック関数はテスト対象の引数として使用できる", () => {
  const mockFn = jest.fn();
  greet("Jiro", mockFn);
  expect(mockFn).toHaveBeenCalledWith("Hello! Jiro");
});
