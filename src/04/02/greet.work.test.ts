import { greet, sayGoodBye } from "./greet";

jest.mock("./greet", () => ({
  ...jest.requireActual("./greet"),
  sayGoodBye: (name: string) => `Good bye, ${name}`,
}));

describe("greet関数のモック化", () => {
  test("greet関数をモックで置き換える", () => {
    expect(greet("Taro")).toBe("Hello! Taro.");
  });
  test("モックに実装を施す", () => {
    expect(sayGoodBye("Taro")).toBe("Good bye, Taro");
  });
});
