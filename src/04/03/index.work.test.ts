import * as Fetchers from "../fetchers";
import { httpError } from "../fetchers/fixtures";
import { getGreet } from "./index.work";

jest.mock("../fetchers");

test("データ取得成功時：ユーザー名がない場合", async () => {
  // getMyProfile が resolve した時の値を再現
  jest.spyOn(Fetchers, "getMyProfile").mockResolvedValueOnce({
    id: "xxxxxxx-123456",
    email: "taroyamada@myapi.testing.com",
  });
  await expect(getGreet()).resolves.toBe("Hello, anonymous user!");
});

// 例外が投げられる場合、指定したエラーが投げられることを確認する
test("データ取得失敗時", async () => {
  jest.spyOn(Fetchers, "getMyProfile").mockRejectedValueOnce(httpError);
  await expect(getGreet()).rejects.toMatchObject({
    err: { message: "internal server error" },
  });
});

// 例外が投げられる場合、例外が投げられることを確認する
test("データ取得失敗時、エラー相当のデータが例外としてスローされる", async () => {
  expect.assertions(1);
  jest.spyOn(Fetchers, "getMyProfile").mockRejectedValueOnce(httpError);
  try {
    await getGreet();
  } catch (err) {
    expect(err).toMatchObject(httpError);
  }
});
